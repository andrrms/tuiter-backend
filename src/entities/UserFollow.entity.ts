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

  @PrimaryColumn({ type: "uuid", name: "follower_id" })
  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @PrimaryColumn({ type: "uuid", name: "target_id" })
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "target_id" })
  target: User;
}
