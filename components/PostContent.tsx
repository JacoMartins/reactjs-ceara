import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: Document
}

export const PostContent = ({ text, ...rest }: Props) => {
  const options: Options = {
    renderNode: {
      paragraph: (_, children) => {
        return <p className="text-gray-800 mb-4">{children}</p>;
      },
      "heading-1": (_, children) => {
        return <h1 className="text-gray-800 text-3xl mb-2">{children}</h1>;
      },
      "heading-2": (_, children) => {
        return <h2 className="text-gray-800 text-2xl mb-2">{children}</h2>;
      },
      "heading-3": (_, children) => {
        return <h3 className="text-gray-800 text-xl mb-2">{children}</h3>;
      },
      "heading-4": (_, children) => {
        return <h4 className="text-gray-800 text-base mb-2">{children}</h4>;
      },
      "heading-5": (_, children) => {
        return <h5 className="text-gray-800 text-sm mb-2">{children}</h5>;
      },
      "heading-6": (_, children) => {
        return <h6 className="text-gray-800 text-xs mb-2">{children}</h6>;
      },
      "bold": (_, children) => {
        return <strong>{children}</strong>;
      },
      "italic": (_, children) => {
        return <em>{children}</em>;
      },
      "underline": (_, children) => {
        return <u>{children}</u>;
      },
      "code": (_, children) => {
        return <code>{children}</code>;
      },
      "superscript": (_, children) => {
        return <sup>{children}</sup>;
      },
      "subscript": (_, children) => {
        return <sub>{children}</sub>;
      },
      'ordered-list': (_, children) => {
        return <ol className="text-gray-800 list-decimal ml-6 mb-4">{children}</ol>;
      },
      'unordered-list': (_, children) => {
        return <ul className="text-gray-800 list-disc ml-6 mb-4">{children}</ul>;
      },
      hr: () => {
        return <hr className="text-gray-800 my-4 border-t-2 border-gray-400" />;
      },
      blockquote: (_, children) => {
        return (
          <blockquote className="text-gray-800 italic border-l-4 border-gray-400 pl-4 py-2 my-4">
            {children}
          </blockquote>
        );
      },
      table: (_, children) => {
        return (
          <table className="text-gray-800 border-collapse border border-gray-400 my-4">
            {children}
          </table>
        );
      },
      hyperlink: (node, children) => {
        return (
          <a
            className="text-blue-500"
            href={node.data.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };
  return (
    <div className={twMerge("mb-8 text-slate-600", rest.className)}>
      {text && documentToReactComponents(text, options)}
    </div>
  );
};
