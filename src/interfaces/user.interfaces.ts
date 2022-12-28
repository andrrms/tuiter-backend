export enum UserAuthorization {
  COMMON = 1,
  MODERATOR,
  ADMIN,
}

export interface IUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  birth_date: string;
  biography?: string;
  localization?: string;
  site?: string;
  avatar_url?: string;
}

export interface IUserResponse extends IUserRequest {
  id: string;
  is_active: boolean;
  authorization_level: UserAuthorization | number;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLogin {
  /** This can be both `email` or `username` */
  login: string;
  password: string;
}

export interface IUserFeed {
  name: string;
  username: string;
  biography: string;
  avatar_url: string;
  following_count: string;
  follower_count: string;
}
