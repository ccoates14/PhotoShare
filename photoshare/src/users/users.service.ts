
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

    return urls;
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
