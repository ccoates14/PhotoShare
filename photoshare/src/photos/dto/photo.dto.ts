export class PhotoDto{

  url: string;

  photoName: string;

  username: string;

  timeStamp: Date;

  tags: Array<string>;

  constructor() {
    this.timeStamp = new Date();
  }
}