import { QueryDto } from './dto/query.dto';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './photo.entity';
import { EntityRepository, Repository } from "typeorm";
import { Console } from 'console';

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

  async getUsersPhotos(username: string): Promise<Array<string>>{
    let results = await this.find({ where: { username: username }, select: ['url'] });
    
    return results.map(v => v.url);
  }

  async addPhotoTags(tags: Array<string>, url: string, username: string) {
    let photo: Photo = await this.findOne({ username: username, url: url });

    tags.forEach(t => {
      if (!(photo.searchStrings)) photo.searchStrings = [];

      photo.searchStrings.push(t);
    });

    photo.save();
  }

  async queryPhotos(query: QueryDto): Promise<Array<string>>{
    let urls = [];
    query.query = query.query.toLowerCase();
  
    const photos: Array<Photo> = await
      this.createQueryBuilder().where("Photo.searchStrings && ARRAY[:t]", { t: `${query.query}` }).
        offset(query.offset)
        .limit(query.limit)
        .getMany();

    urls = photos.map(p => p.url);

    return urls;

  }
}