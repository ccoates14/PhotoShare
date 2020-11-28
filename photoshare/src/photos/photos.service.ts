import { Photo } from './photo.entity';
import { QueryDto } from './dto/query.dto';
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

  async getUsersPhotos(username: string): Promise<Array<string>>{
    return this.photoRepository.getUsersPhotos(username);
  }

  async addPhotoTags(tags: Array<string>, url: string, username: string) {
    this.photoRepository.addPhotoTags(tags, url, username);
  }

  async queryPhotos(query: QueryDto): Promise<Array<string>>{
    return this.photoRepository.queryPhotos(query);
  }

  async getAllPhotos(offset: number, limit: number): Promise<Array<string>>{
    return this.photoRepository.getAllPhotos(offset, limit);
  }
}
