import api from "./api";
import type { Post } from "../types/post.type";

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts", {
    params: {
      _limit: 20,
    },
  });

  return response.data;
};
