import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
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
  ) {}

  async usernameExists(username: string): Promise<boolean> {
    return this.userRepository.usernameExists(username);
  }

  async submitPhotos(images: any): Promise<Array<string>> {
    const urls = await this.uploadImagesToCloudinary(images);

    return urls;
  }

  private async uploadImagesToCloudinary(images: any): Promise<Array<string>> {
    let urls = [];
    let uploads = [];
    for (let i = 0; i < images.length; i++) {
      uploads.push(
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              timeout: 5000,
            },
            (e, r) => {
              if (e) {
                console.log(e);
                reject();
              } else {
                urls.push(r.url);
                resolve();
              }
            },
          );

          streamifier.createReadStream(images[i].buffer).pipe(stream);
        }),
      );
    }

    await Promise.all(uploads);

    return urls;
  }
}
