import { PostCard } from "../components/post-card";
import { getPosts } from "../lib/post";

export default async function PostsPage(): Promise<React.JSX.Element> {
  const posts = await getPosts();

  const sortedPosts = posts.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );

  return (
    <section>
      <h1>목록</h1>
      <ul>
        {sortedPosts.map(({ frontmatter, slug }) => (
          <li key={slug}>
            <PostCard {...frontmatter} slug={slug} />
          </li>
        ))}
      </ul>
    </section>
  );
}
