import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import UserFollow from "./UserFollow.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 24 })
  username: string;

  @Column({ length: 80 })
  email: string;

  @Column({ length: 160 })
  @Exclude()
  password: string;

  @Column({ length: 160, nullable: true })
  biography: string;

  @Column({ length: 30, nullable: true })
  localization: string;

  @Column({ length: 100, nullable: true })
  site: string;

  @Column("date")
  birth_date: string;

  @Column({ length: 350, nullable: true })
  avatar_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column("integer", { default: 1 })
  authorization_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserFollow, (follow) => follow.following)
  following: UserFollow[];

  @OneToMany(() => UserFollow, (follow) => follow.follower)
  followers: UserFollow[];
}
