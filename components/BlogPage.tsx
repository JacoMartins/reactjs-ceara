import Head from "next/head";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HighlightedPostCard } from "./HighlightedPostCard";
import { PostCard } from "./PostCard";
import { Post as PostType } from "@/types/post";
import Link from "next/link";

type Props = {
  highlightPosts: PostType[];
  recentPosts: PostType[];
  posts: PostType[];
};

export const BlogPage = ({ highlightPosts, recentPosts, posts }: Props) => {
  return (
    <>
      <Head>
        <title>React Ceará Blog</title>
      </Head>
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 w-full p-8 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 justify-between items-start w-full border-b border-gray-300">
              <div className="flex flex-col gap-4 lg:max-w-4xl">
                <h1 className="text-2xl font-medium">Em Destaque</h1>

                <div className="flex flex-col gap-6">
                  {
                    highlightPosts.map((post) => (
                      <HighlightedPostCard
                        key={post.id}
                        post={post}
                      />
                    ))
                  }
                </div>
              </div>

              {
                recentPosts.length > 0 &&
                <div className="flex flex-col gap-4 w-full lg:max-w-sm">
                  <h1 className="text-2xl font-medium">Últimos Posts</h1>
                  <div className="flex flex-col gap-4">
                    {
                      recentPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                        />
                      ))
                    }
                  </div>
                </div>
              }
            </div>

            {
              posts.length > 1 &&
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">Outras Postagens</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {
                    posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                      />
                    ))
                  }
                </div>
              </div>
            }
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};