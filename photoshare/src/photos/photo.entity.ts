import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Photo extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  url: string;

  @Column()
  photoName: string;

  @Column()
  timeStamp: Date;

  @Column("text", { array: true , nullable: true})
  searchStrings: Array<string>;
  
} 