import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
 
/**
 * @param {string} content Markdown文本内容
 * @param {Boolean}  escapeHtml 是否转义html语法，参数为true后转义显示html源码
 */

export default function MarkdownPreview({ content }) {
  return (
    <ReactMarkdown   
      remarkPlugins={[remarkMath]}
      escapeHtml={true} // escapeHtml 是否转义html语法，参数为true后转义显示html源码
      rehypePlugins={[rehypeKatex, rehypeRaw]} 
    >
    {content}
    </ReactMarkdown>
  );
}

