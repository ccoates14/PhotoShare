import { QueryDto } from './dto/query.dto';
import { PhotosService } from './photos.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Photo } from './photo.entity';

@Controller('photos')
export class PhotosController {

  constructor(private photosService: PhotosService){}

  @Get('/username/:username')
  async getUserPhotos(@Param('username') username: string) : Promise<Array<string>>{
    return this.photosService.getUsersPhotos(username);
  }

  @Get()
  async queryPhotos(@Query() queryDto: QueryDto): Promise<Array<string>>{
    return this.photosService.queryPhotos(queryDto);
  }

  @Get('/all/:offset/:limit')
  async getAllPhotos(@Param('offset') offset: number, @Param('limit') limit: number): Promise<Array<string>>{
    return this.photosService.getAllPhotos(offset, limit);
  }
}
