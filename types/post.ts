import type { Author } from "./author";
import { Cover } from "./cover";

export type Post = {
  id?: string;
  isHighlighted?: boolean;
  cover?: Cover;
  category?: string;
  title?: string;
  description?: string;
  content?: {
    json: any;
  };
  authors?: Array<Author>;
  createdAt?: string;
  updatedAt?: string;
};