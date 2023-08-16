import { getPosts } from "@/api/operations/getPosts";
import { BlogPage } from "@/components/BlogPage";
import { PostOrder } from "@/schema";
import { Post } from "@/types/post";

interface Props {
  posts: Post[];
  recentPosts: Post[];
  highlightedPosts: Post[];
}

export default function Blog({ posts, recentPosts, highlightedPosts }: Props) {
  return (
    <div>
      <BlogPage
        highlightPosts={highlightedPosts}
        recentPosts={recentPosts}
        posts={posts}
      />
    </div>
  );
}

export async function getStaticProps() {
  const { items: highlightedPosts } = await getPosts({
    order: [PostOrder.CreatedAtDesc],
    limit: 2,
    where: {
      isHighlighted: true,
    },
  });

  const { items: recentPosts } = await getPosts({
    order: [PostOrder.CreatedAtDesc],
    limit: 5,
    where: {
      isHighlighted: false,
    }
  });

  const { items: posts } = await getPosts({
    order: [PostOrder.CreatedAtDesc],
    limit: 12,
    skip: 5,
    where: {
      isHighlighted: false,
    }
  });

  return {
    props: {
      recentPosts,
      highlightedPosts,
      posts,
    },
  };
}