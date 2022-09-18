import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import User from "./User.entity";

@Entity("users_follows")
export default class UserFollow {
  @CreateDateColumn()
  created_at: Date;

  @PrimaryColumn({ type: "uuid", name: "following_id" })
  @ManyToOne(() => User, (user) => user.following, { eager: true })
  @JoinColumn({ name: "following_id" })
  following: User;

  @PrimaryColumn({ type: "uuid", name: "follower_id" })
  @ManyToOne(() => User, (user) => user.followers, { eager: true })
  @JoinColumn({ name: "follower_id" })
  follower: User;
}
