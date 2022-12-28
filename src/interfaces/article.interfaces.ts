import { IUserFeed } from "./user.interfaces";

export interface IArticleRequest {
  body: string;
  localization?: string;

  article_quote_id?: string;
  article_reply_id?: string;
}

type A = IArticleRequest & IUserFeed;

export interface IArticleResponse {
  page: number;
  prevLink?: string;
  nextLink?: string;
  results: A[];
}

export interface IArticleMedia {
  id: string;
  media_hash: string;
  media_url: string;
  mime_type: string;
  alt_text: string;
}

export interface IArticleResponse extends IArticleRequest {
  id: string;
  article_media_id?: string;
}

export interface IArticleFeed extends IArticleRequest, IUserFeed {
  id: string;
  author?: IUserFeed;
  author_id: string;
  created_at: Date;
  updated_at: Date;
}
