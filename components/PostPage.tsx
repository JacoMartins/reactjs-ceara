import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Post as PostType } from "@/types/post";
import { OtherPostCard } from "./OtherPostCard";
import Image from "next/image";
import { PostContent } from "./PostContent";

interface Props {
  post: PostType
  otherPosts: Array<PostType>
}

export function PostPage({ post: { category, title, description, cover, authors, content, createdAt, updatedAt }, otherPosts }: Props) {
  const created_at_date = new Date(createdAt?.toString() || "").toLocaleDateString("pt-BR", { dateStyle: "long" })
  const updated_at_date = new Date(updatedAt?.toString() || "").toLocaleDateString("pt-BR", { dateStyle: "long" })

  return (
    <>
      <Head>
        <title>React Ceará Blog - {title}</title>
      </Head>
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center">

          <div className="flex flex-col gap-8 w-full max-w-5xl p-8 lg:py-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center">
                  {
                    authors?.map((author, index) => (
                      <div key={author.id} className={`relative h-8 w-8 overflow-hidden rounded-full sm:h-8 sm:w-8 ${index > 0 ? 'ml-[-0.75rem]' : 'ml-0'}`}>
                        {
                          (author.avatar) && (
                            <Image
                              src={author.avatar.url?.toString() || ''}
                              alt={''}
                              fill
                              className="object-cover"
                            />
                          )
                        }
                      </div>
                    ))
                  }
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row">
                    {
                      authors?.map((author, index) => (
                        <a className="font-bold text-base text-gray-700">
                          {index !== 0 ? index === authors.length - 1 ? <>&nbsp;&&nbsp;</> : <>&nbsp;,&nbsp;</> : ''}
                          {author.name}
                        </a>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-gray-500 text-sm md:text-right">
                <span>Postado em {created_at_date}</span>
                {updatedAt && <span>Ultima atualização em: {updated_at_date}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-md font-bold text-sky-800">{category}</h3>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{title}</h1>

              <p className="text-base text-gray-500">{description}</p>
            </div>

            <div className="aspect-video w-auto h-auto bg-gray-200 rounded-lg overflow-hidden">
              <img className="object-cover w-full h-full" src={cover?.url} alt="Blog Post Cover" />
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-8 lg:gap-14">
              <PostContent
                className="w-full border-b border-gray-300 lg:border-transparent"
                text={content?.json}
              />

              <div className="flex flex-col gap-8 w-full max-w-xl lg:max-w-[15rem]">
                <h1 className="text-xl text-gray-800 font-medium">Mais Postagens</h1>
                <div className="flex flex-col gap-6">
                  {
                    otherPosts?.map((post) => (
                      <OtherPostCard
                        key={post.id}
                        post={post}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}