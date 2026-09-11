import { useEffect, useState } from "react";
import axios from "axios";
import { getPosts } from "../services/post.service";
import type { Post } from "../types/post.type";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        setPosts(data);
      } catch (error: unknown) {
        if (axios.isCancel(error)) {
          return;
        }
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <p>Loadingg....</p>;
  if (error) return <p style={{ color: "red" }}>Error : {error}</p>;

  return (
    <section>
      <h2>Daftar Post</h2>

      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <span>Post #{post.id}</span>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
