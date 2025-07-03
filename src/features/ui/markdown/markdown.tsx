import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import { Citation } from "./citation";
import { CodeBlock } from "./code-block";
import { citationConfig } from "./config";
import { MarkdownProvider } from "./markdown-context";
import { Paragraph } from "./paragraph";
import { FileThumbnail } from '../file-thumbnail';

interface Props {
  content: string;
  onCitationClick: (
    previousState: any,
    formData: FormData
  ) => Promise<JSX.Element>;
}

export const Markdown: FC<Props> = (props) => {
  // 🟡 Strip hidden content before Markdoc
  const visibleContent = props.content.replace(/<!--hidden-->[\s\S]*?<!--endhidden-->/gi, '');
  const ast = Markdoc.parse(visibleContent);

  const content = Markdoc.transform(ast, {
    ...citationConfig,
  });

  const WithContext = () => (
    <MarkdownProvider onCitationClick={props.onCitationClick}>
      {Markdoc.renderers.react(content, React, {
        components: { Citation, Paragraph, CodeBlock, FileThumbnail },
      })}
    </MarkdownProvider>
  );

  return <WithContext />;
};
