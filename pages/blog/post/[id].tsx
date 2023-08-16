import { getPostById } from "@/api/operations/getPostById"
import { getPosts } from "@/api/operations/getPosts"
import { PostPage } from "@/components/PostPage"
import { PostOrder } from "@/schema"
import { Post } from "@/types/post"

interface Props {
  post: Post
  otherPosts: Array<Post>
}

export default function Post({ post, otherPosts }: Props) {
  return (
    <div>
      <PostPage post={post} otherPosts={otherPosts} />
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const { id } = params
  const post = await getPostById(id)

  const { items: otherPosts } = await getPosts({
    order: [PostOrder.CreatedAtDesc],
    limit: 2,
    where: {
      sys: {
        id_not: id
      }
    }
  })

  return {
    props: {
      post,
      otherPosts
    }
  }
}