import { PhotosRepository } from './photos.repository';
import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(PhotosRepository)
    private photoRepository: PhotosRepository) { }

  async submitPhoto(photoDto: PhotoDto): Promise<boolean>{
    return this.photoRepository.submitPhoto(photoDto);
  }

}
