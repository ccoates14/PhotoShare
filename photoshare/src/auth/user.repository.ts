
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "../users/user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = authCredentialsDto.username;
    user.salt = salt;
    user.password = await this.hashPassword(authCredentialsDto.password, salt);

    try {
      await user.save(); 
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already taken');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async usernameExists(username: string): Promise<boolean>{
    if (await this.findOne({ username })) {
      return true;
    }

    return false;
  }

  async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    
    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password, salt);
  }
}