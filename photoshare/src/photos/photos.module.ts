import { PhotosRepository } from './photos.repository';
import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService],
  imports: [TypeOrmModule.forFeature([PhotosRepository])],
})
export class PhotosModule {}
