import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { typeormconfig } from './config/typeorgm.config';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormconfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'photoshare_webapp/dist')
    }),
    AuthModule,
    UsersModule,
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
