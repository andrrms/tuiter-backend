import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User.entity";

@Entity("article_post")
export default class ArticlePost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 240 })
  body: string;

  @Column({ length: 30 })
  localization: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "author_id" })
  author: string;

  @OneToOne(() => ArticlePost, { nullable: true, eager: true })
  @JoinColumn({ name: "article_quote_id" })
  article_quote: string;

  @OneToOne(() => ArticlePost, { nullable: true })
  @JoinColumn({ name: "article_reply_id" })
  article_reply: string;
}
