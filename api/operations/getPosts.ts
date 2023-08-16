import { Post } from "@/types/post";
import { GetPostsQuery, GetPostsQueryVariables } from "../../schema";
import { fetchGraphQL } from "../fetchGraphQL";
import { Author } from "@/types/author";

export const getPosts = async (
  variables?: Partial<GetPostsQueryVariables>
): Promise<{
  skip?: number;
  limit?: number;
  total?: number;
  items: Post[];
}> => {
  const response = await fetchGraphQL<GetPostsQuery>(
    /* GraphQL */ `
      query getPosts(
        $order: [PostOrder]
        $limit: Int
        $skip: Int
        $where: PostFilter
      ) {
        postCollection(
          order: $order
          limit: $limit
          skip: $skip
          where: $where
        ) {
          skip
          total
          limit
          items {
            sys {
              id
            }
            isHighlighted
            cover {
              title
              url
              description
              contentType
              fileName
              size
              width
              height
            }
            category
            title
            description
            content {
              json
            }
            authorCollection {
              items {
                sys {
                  id
                }
                name
                jobTitle
                bio
                isOrganizer
                github
                company
                avatar {
                  title
                  url
                  description
                  contentType
                  fileName
                  size
                  width
                  height
                }
              }
            }          
            createdAt
            updatedAt
          }
        }
      }
    `, { variables })

  return {
    ...response.data?.postCollection,
    items:
      response.data?.postCollection?.items.map<Post>(
        (item) => ({
          id: item?.sys.id,
          isHighlighted: item?.isHighlighted,
          cover: item?.cover,
          category: item?.category,
          title: item?.title,
          description: item?.description,
          content: item?.content,
          authors: item?.authorCollection?.items.map<Author>(
            (item) => ({
              id: item?.sys.id,
              name: item?.name,
              avatar: item?.avatar,
            })
          ),
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
      })) || [],
  }
}
