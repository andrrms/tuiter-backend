import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import ArticlePost from "./ArticlePost.entity";
import User from "./User.entity";

@Entity("article_likes")
export default class ArticleLikes {
  @CreateDateColumn()
  created_at: Date;

  @PrimaryColumn({ type: "uuid", name: "user_id" })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: string;

  @PrimaryColumn({ type: "uuid", name: "article_id" })
  @ManyToOne(() => ArticlePost, (article) => article.id, { eager: true })
  @JoinColumn({ name: "article_id" })
  article: string;
}
