import { UsersService } from './users.service';
import { Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){}

  @Get('/userExists/:username')
  async userExists(@Param('username') username: string): Promise<boolean>{
    return this.userService.usernameExists(username);
  }


  @Post('/submitPhotos')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('images'))
  async submitPhotos(@UploadedFiles() images): Promise<Array<string>>{
    return await this.userService.submitPhotos(images);
  }

}
