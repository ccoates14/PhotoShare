import { PhotosModule } from './../photos/photos.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    PhotosModule
  ]
})
export class UsersModule {}
