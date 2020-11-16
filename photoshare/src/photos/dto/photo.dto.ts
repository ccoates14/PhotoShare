export class PhotoDto{

  url: string;

  photoName: string;

  username: string;

  timeStamp: Date;

  constructor() {
    this.timeStamp = new Date();
  }
}