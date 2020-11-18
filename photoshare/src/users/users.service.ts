import { PhotosService } from './../photos/photos.service';
import { PhotoDto } from './../photos/dto/photo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  //these can be injected from the env later
  cloud_name: 'dlmueporq',
  api_key: '461192812498251',
  api_secret: 'MZYd6MgtICekB_EZQwuuNQ96KrA',
});
let streamifier = require('streamifier');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private photosService: PhotosService,
  ) {}

  async usernameExists(username: string): Promise<boolean> {
    return this.userRepository.usernameExists(username);
  }

  async submitPhotos(images: any, username: string): Promise<Array<string>> {
    let urlsToImageFile = {};
    const urls = [];

    if (!images || images.length == 0) {
      console.log(images);
      throw Error('No images!');
    }

    try {
      urlsToImageFile = await this.uploadImagesToCloudinary(images);
      const databaseSubmit = [];

      for (let i in urlsToImageFile) {
        urls.push(i);
      }

      urls.forEach(url => {
        const photoDto = new PhotoDto();

        photoDto.photoName = urlsToImageFile[url].originalname;
        photoDto.url = url;
        photoDto.username = username;

        databaseSubmit.push(this.photosService.submitPhoto(photoDto));
      });

      await Promise.all(databaseSubmit);
    } catch (err) {
      console.log(err);
      throw err;
    }

    this.insertPhotosTags(urls, username);

    return urls;
  }

  private async insertPhotosTags(urls, username) {
    const request = require('request'),
      apiKey = 'acc_6b4f35f52ec332c', //THESE COULD ALWAYS BE INJECTED THROUGH ENV VARS LATER
      apiSecret = '3a9877ccf6516ce142181da7b0d54f9a',
      me = this;

    function getAndInsertPhotoTags() {
      if (urls.length) {
        let currentUrl = null;
        request
          .get(
            'https://api.imagga.com/v2/tags?image_url=' +
              encodeURIComponent((currentUrl = urls.pop())),
            function(_, __, body) {
              const url = currentUrl;
              let tags = JSON.parse(body);
              try {
                tags = tags['result']['tags'];
                me.photosService.addPhotoTags(
                  tags.slice(0, 3).map(t => t['tag']['en']),
                  url,
                  username,
                );
              } catch (err) {
                console.log(tags);
                console.log(err);
              } finally {
                getAndInsertPhotoTags();
              }
            },
          )
          .auth(apiKey, apiSecret, true);
      }
    }

    getAndInsertPhotoTags();
  }

  private async uploadImagesToCloudinary(images: any): Promise<any> {
    let urlsToImages = {};
    let uploads = [];

    for (let i = 0; i < images.length; i++) {
      uploads.push(
        new Promise((resolve, reject) => {
          const image = images[i];
          const stream = cloudinary.uploader.upload_stream(
            {
              timeout: 50000,
            },
            (e, r) => {
              if (e) {
                console.log(e);
                reject();
              } else {
                urlsToImages[r.url] = image;
                resolve();
              }
            },
          );

          streamifier.createReadStream(image.buffer).pipe(stream);
        }),
      );
    }

    await Promise.all(uploads);

    return urlsToImages;
  }
}
