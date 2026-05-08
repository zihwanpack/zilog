import { PostCard } from "../components/post-card";
import { getPosts } from "../lib/post";

export default async function PostsPage(): Promise<React.JSX.Element> {
  const posts = await getPosts();

  const sortedPosts = posts.sort((a, b) =>
    b.metadata.date.localeCompare(a.metadata.date),
  );

  return (
    <section>
      <h1>목록</h1>
      <ul>
        {sortedPosts.map(({ metadata, slug, readingTime }) => (
          <PostCard
            {...metadata}
            slug={slug}
            key={slug}
            readingTime={readingTime}
          />
        ))}
      </ul>
    </section>
  );
}
