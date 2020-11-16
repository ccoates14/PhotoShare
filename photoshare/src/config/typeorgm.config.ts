import { Photo } from './../photos/photo.entity';
import { User } from '../users/user.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

export const typeormconfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ZedZed1234!$',
  database: 'photos',
  entities: [User, Photo],
  synchronize: true
}
