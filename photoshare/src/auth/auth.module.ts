import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topsecret51', //this will get changed later
      signOptions: {
        expiresIn: 3600//1 hour
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
