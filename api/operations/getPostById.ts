import { GetPostByIdQuery } from "@/schema";
import { fetchGraphQL } from "../fetchGraphQL";

import { Post } from "../../types/post";

export const getPostById = async (
  id: string
): Promise<Post | undefined> => {
  const response = await fetchGraphQL<GetPostByIdQuery>(
    /* GraphQL */ `
      query getPostById($id: String!) {
        post(id: $id) {
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
    `,
    { variables: { id } }
  );

  if (response.data?.post) {
    return {
      isHighlighted: response.data.post.isHighlighted,
      cover: response.data.post.cover,
      category: response.data.post.category,
      title: response.data.post.title,
      description: response.data.post.description,
      content: response.data.post.content,
      authors: response.data.post.authorCollection?.items.map((author) => ({
        id: author?.sys.id,
        name: author?.name,
        jobTitle: author?.jobTitle,
        bio: author?.bio,
        isOrganizer: author?.isOrganizer,
        github: author?.github,
        company: author?.company,
        avatar: author?.avatar,
      })) || [],
      createdAt: response.data.post.createdAt,
      updatedAt: response.data.post.updatedAt,
    };
  }
};
