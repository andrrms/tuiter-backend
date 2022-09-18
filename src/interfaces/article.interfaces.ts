export interface IArticleRequest {
  body: string;
  localization?: string;

  article_quote_id?: string;
  article_reply_id?: string;
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
