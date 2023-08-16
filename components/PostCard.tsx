import { Post } from "@/types/post"
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: Post;
}

export function PostCard({ post: { id, cover, category, title, description, authors, createdAt } }: Props) {
  const created_at = new Date(createdAt?.toString() || "")
  const postUrl = `/blog/post/${id}`

  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-gray-300 last:border-transparent w-auto">
      <div className="flex flex-row items-center gap-2">
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
                <span className="font-bold text-sm text-gray-700" key={'span' + author.id + index}>
                  {index !== 0 ? index === authors.length - 1 ? <>&nbsp;&&nbsp;</> : <>,&nbsp;</> : ''}
                  {author.name}
                </span>
              ))
            }
          </div>
          <span className="text-sm text-gray-500">{created_at.toLocaleDateString("pt-BR", { dateStyle: "long" })}</span>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <Link href={postUrl}>
          <div className="aspect-square w-24 h-24 min-w-max bg-gray-200 rounded-lg overflow-hidden">
            {cover?.url && <Image className="object-cover w-full h-full" src={cover.url} alt="Blog Post Cover" />}
          </div>
        </Link>

        <div className="flex flex-col gap-2 leading-tight w-max">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-sky-700">{category}</span>
            <Link href={postUrl}>
              <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
            </Link>
          </div>

          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  )
}