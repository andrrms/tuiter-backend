import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User.entity";

@Entity("article_post")
export default class ArticlePost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 240 })
  body: string;

  @Column({ length: 30, nullable: true })
  localization?: string;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToOne(() => ArticlePost, { nullable: true })
  @JoinColumn({ name: "article_quote_id" })
  article_quote?: string;

  @OneToOne(() => ArticlePost, { nullable: true })
  @JoinColumn({ name: "article_reply_id" })
  article_reply?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
