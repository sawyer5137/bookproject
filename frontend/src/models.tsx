export type User = {
  userId: number;
  username: string;
  createdAt: string;
  roleId: number;
};

export type UserBook = {
  title: string;
  author: string;
  have_read: boolean;
  hard_cover: boolean;
  rating: number;
};

export type Book = {
  id: number;
  year: string;
  title: string;
  author: string;
  publisher: string;
  pages: string;
  genre: string;
};
