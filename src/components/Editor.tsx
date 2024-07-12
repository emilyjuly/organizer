import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { InitialContent } from "./InitialContent";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Underline from "@tiptap/extension-underline";

import "highlight.js/styles/tokyo-night-dark.css";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxUnderline,
  RxChevronDown,
  RxChatBubble,
} from "react-icons/rx";
import BubbleButton from "./BubbleButton";

const lowlight = createLowlight(common);

lowlight.highlight("js", '"use strict";');

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
    ],
    content: InitialContent,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  const menuButtonsIcons = [
    {
      icon: <RxFontBold className="h-4 w-4" />,
      style: "bold",
      action: () => editor && editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <RxFontItalic className="h-4 w-4" />,
      style: "italic",
      action: () => editor && editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <RxUnderline className="h-4 w-4" />,
      style: "underline",
      action: () => editor && editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <RxStrikethrough className="h-4 w-4" />,
      style: "strikethrough",
      action: () => editor && editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: <RxCode className="h-4 w-4" />,
      style: "code",
      action: () => editor && editor.chain().focus().toggleCode().run(),
    },
  ];

  return (
    <>
      <EditorContent
        editor={editor}
        className="prose prose-violet mx-auto pt-16"
      />

      {editor && (
        <FloatingMenu
          className="flex flex-col gap-y-2 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 px-2 py-2 shadow-xl shadow-black/20"
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
        >
          <p className="text-xs text-zinc-400">Basic blocks</p>
          <button className="flex min-w-[280px] items-center gap-2 rounded hover:bg-zinc-100">
            <img
              src="https://www.notion.so/images/blocks/text/en-US.png"
              alt="Text"
              className="w-10 rounded border border-zinc-300"
            />
            <div className="flex flex-col">
              <span className="text-start text-sm">Text</span>
              <span className="text-xs text-zinc-500">
                Just start writing with plain text.
              </span>
            </div>
          </button>
          <button
            className="flex min-w-[280px] items-center gap-2 rounded hover:bg-zinc-100"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <img
              src="https://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Heading 1"
              className="w-10 rounded border border-zinc-300"
            />
            <div className="flex flex-col">
              <span className="text-start text-sm">Heading 1</span>
              <span className="text-xs text-zinc-500">
                Big section heading.
              </span>
            </div>
          </button>
          <button
            className="flex min-w-[280px] items-center gap-2 rounded hover:bg-zinc-100"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <img
              src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
              alt="Heading 2"
              className="w-10 rounded border border-zinc-300"
            />
            <div className="flex flex-col">
              <span className="text-start text-sm">Heading 2</span>
              <span className="text-xs text-zinc-500">
                Medium section heading.
              </span>
            </div>
          </button>
          <button
            className="flex min-w-[280px] items-center gap-2 rounded hover:bg-zinc-100"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <img
              src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
              alt="Heading 3"
              className="w-10 rounded border border-zinc-300"
            />
            <div className="flex flex-col">
              <span className="text-start text-sm">Heading 3</span>
              <span className="text-xs text-zinc-500">
                Small section heading.
              </span>
            </div>
          </button>
        </FloatingMenu>
      )}

      {editor && (
        <BubbleMenu
          className="flex divide-x divide-zinc-200 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-xl shadow-black/20"
          editor={editor}
        >
          <BubbleButton>
            Text
            <RxChevronDown className="h-4 w-4" />
          </BubbleButton>
          <BubbleButton>
            <RxChatBubble className="h-4 w-4" />
            Comment
          </BubbleButton>
          <div className="flex items-center">
            {menuButtonsIcons.map(({ icon, style, action }) => (
              <BubbleButton
                key={style}
                onClick={action}
                data-active={editor.isActive(style)}
              >
                {icon}
              </BubbleButton>
            ))}
          </div>
        </BubbleMenu>
      )}
    </>
  );
}
