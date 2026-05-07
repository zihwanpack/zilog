import { getPosts } from "../lib/post";

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <section>
      <h1>목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
