import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("article_media")
export default class ArticleMedia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 256, nullable: true })
  media_hash: string;

  @Column({ length: 350 })
  media_url: string;

  @Column({ length: 50 })
  mime_type: string;

  @Column({ length: 1000, nullable: true })
  alt_text: string;
}
