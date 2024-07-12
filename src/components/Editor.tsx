import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import "highlight.js/styles/tokyo-night-dark.css";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxUnderline,
} from "react-icons/rx";
import BubbleButton from "./BubbleButton";

const lowlight = createLowlight(common);

lowlight.highlight("js", '"use strict";');

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      Blockquote,
      HorizontalRule,
      CodeBlock,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Placeholder.configure({
        placeholder: "Write something, or press '/ ' for commands...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  const menuButtons = [
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

  const floatingMenuButtons = [];

  if (editor) {
    const { state, dispatch } = editor && editor.view;
    const { from } = state.selection;

    const transaction = state.tr.delete(from - 1, from);

    floatingMenuButtons.push(
      {
        src: "https://www.notion.so/images/blocks/header.57a7576a.png",
        name: "Heading 1",
        text: "Big section heading.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
        name: "Heading 2",
        text: "Medium section heading.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        name: "Heading 3",
        text: "Small section heading.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleHeading({ level: 3 }).run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/numbered-list.0406affe.png",
        name: "Numbered list",
        text: "Create a list with numbering.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/code.a8b201f4.png",
        name: "Code",
        text: "Capture a code snippet",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleCodeBlock().run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/quote/en-US.png",
        name: "Quote",
        text: "Capture a quote.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().toggleBlockquote().run();
        },
      },
      {
        src: "https://www.notion.so/images/blocks/divider.210d0faf.png",
        name: "Divider",
        text: "Visually divide blocks.",
        action: () => {
          dispatch(transaction);
          editor && editor.chain().focus().setHorizontalRule().run();
        },
      },
    );
  }

  return (
    <>
      <EditorContent editor={editor} className="prose prose-violet pt-16" />

      {editor && (
        <FloatingMenu
          className="flex max-h-[20rem] flex-col gap-y-2 overflow-hidden overflow-y-auto rounded-lg border border-zinc-100 bg-zinc-50 px-2 py-2 shadow-xl shadow-black/20"
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
        >
          <p className="text-xs text-zinc-400">Basic blocks</p>
          {floatingMenuButtons.map(({ src, name, text, action }) => (
            <button
              className="flex min-w-[280px] items-center gap-2 rounded hover:bg-zinc-100"
              onClick={action}
            >
              <img
                src={src}
                alt={name}
                className="w-10 rounded border border-zinc-300"
              />
              <div className="flex flex-col">
                <span className="text-start text-sm">{name}</span>
                <span className="text-xs text-zinc-500">{text}</span>
              </div>
            </button>
          ))}
        </FloatingMenu>
      )}

      {editor && (
        <BubbleMenu
          className="flex divide-x divide-zinc-200 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-xl shadow-black/20"
          editor={editor}
        >
          <div className="flex items-center">
            {menuButtons.map(({ icon, style, action }) => (
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
