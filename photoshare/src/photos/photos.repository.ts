import { PhotoDto } from './dto/photo.dto';
import { Photo } from './photo.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Photo)
export class PhotosRepository extends Repository<Photo>{

  async submitPhoto(photoDto: PhotoDto): Promise<boolean>{
    let succeeded = false;
    const photo = new Photo();

    photo.photoName = photoDto.photoName;
    photo.timeStamp = photoDto.timeStamp;
    photo.url = photoDto.url;
    photo.username = photoDto.username;

    try {
      await photo.save();
      succeeded = true;
    } catch (err) {
      console.log(err);
    }

    return succeeded;
  }

  //get photos by username

  //get photos by query
}