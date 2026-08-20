"use client";

// Everything heavy lives here — Tiptap, ProseMirror, and the markdown
// serializer. This module is only ever reached through the `next/dynamic`
// boundary in RichTextEditor.tsx, so none of it lands in the chunk of the form
// that renders the field.
import { Placeholder } from "@tiptap/extensions";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Redo2,
  Undo2,
} from "lucide-react";
import { type ForwardedRef, useEffect, useRef } from "react";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";

import { cn } from "@/shared/lib/utils";

import type { RichTextEditorProps } from "./RichTextEditor";

// Tiptap 3 types `editor.storage` through an interface each extension is meant
// to augment. tiptap-markdown declares its storage shape but never registers
// it, so `editor.storage.markdown` is otherwise a type error.
declare module "@tiptap/core" {
  interface Storage {
    markdown: MarkdownStorage;
  }
}

/**
 * The editor speaks Markdown in both directions.
 *
 * The stored value stays exactly what it was under draft-js — a Markdown
 * string, rendered by `shared/ui/Markdown` — so nothing in the database, the
 * Zod schemas or the read side changes. What does change is loading: the old
 * editor called `ContentState.createFromText`, which put stored Markdown on
 * screen as literal `**text**`, so reopening a saved job description showed its
 * own syntax. `Markdown.configure` parses on the way in as well as out.
 */
function useMarkdownEditor({
  value,
  onChange,
  placeholder,
}: Pick<RichTextEditorProps, "value" | "onChange" | "placeholder">) {
  // `onChange` is a fresh closure on every render of the form; reading it from
  // a ref keeps the editor's own handler stable.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    // The form owns the DOM this renders into, and rendering it on the server
    // as well would mismatch on hydration.
    immediatelyRender: false,
    extensions: [
      // The stored value has to survive `shared/ui/Markdown`, which renders
      // with react-markdown and no `rehype-raw` — anything Tiptap can only
      // express as raw HTML would reach the job page as literal `<u>` text.
      // So the schema is held to marks Markdown itself can carry, and to the
      // ones that renderer styles.
      //
      // Underline goes with them. Markdown has no underline, and the button it
      // replaces was decorative already: markdown-draft-js shipped no
      // `UNDERLINE` mapping, so the old editor dropped the style on save.
      StarterKit.configure({
        underline: false,
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        link: {
          openOnClick: false,
          // Only ever emit links we would be willing to render.
          protocols: ["http", "https", "mailto"],
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Placeholder.configure({ placeholder: placeholder ?? "" }),
      Markdown.configure({
        // Left off so the editor reads and writes the same CommonMark
        // `react-markdown` does on the job page. With `breaks` on, a lone
        // newline is a visible line break here and a joined paragraph there,
        // and a Shift+Enter break serializes to a newline the page swallows.
        breaks: false,
        transformPastedText: true,
      }),
    ],
    content: value ?? "",
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[150px] cursor-text px-3 py-2 text-sm focus:outline-none",
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChangeRef.current?.(instance.storage.markdown.getMarkdown());
    },
  });

  // Pick up resets the form performs on its own — `form.reset()` after a save,
  // or a wizard step remounting with stored values. Comparing against what the
  // editor already holds is what keeps this from clobbering the caret on every
  // keystroke, since each keystroke also sends a new `value` back down.
  useEffect(() => {
    if (!editor) return;
    const next = value ?? "";
    if (next === editor.storage.markdown.getMarkdown()) return;
    editor.commands.setContent(next, { emitUpdate: false });
  }, [editor, value]);

  return editor;
}

interface ToolbarButtonProps {
  label: string;
  icon: typeof Bold;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

function ToolbarButton({
  label,
  icon: Icon,
  onClick,
  isActive = false,
  isDisabled = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      // A toolbar button is a control over the text, not a destination in the
      // tab order — and tabbing out of the editor to reach Bold would lose the
      // selection it applies to.
      tabIndex={-1}
      title={label}
      aria-label={label}
      aria-pressed={isActive}
      disabled={isDisabled}
      // The editor loses its selection the moment focus leaves it, so the press
      // has to be handled before the browser moves focus.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        isActive && "bg-muted text-foreground",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const href = window.prompt("Link URL", "https://");
    // Cancelling the prompt returns null; an empty string means the field was
    // cleared. Neither is a link.
    if (!href) return;

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      className="flex flex-wrap items-center gap-0.5 border-b border-border px-1.5 py-1"
    >
      <ToolbarButton
        label="Bold"
        icon={Bold}
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        label="Italic"
        icon={Italic}
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
      <ToolbarButton
        label="Bulleted list"
        icon={List}
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        label="Numbered list"
        icon={ListOrdered}
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
      <ToolbarButton
        label={editor.isActive("link") ? "Remove link" : "Add link"}
        icon={editor.isActive("link") ? Link2Off : Link2}
        isActive={editor.isActive("link")}
        onClick={toggleLink}
      />
      <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
      <ToolbarButton
        label="Undo"
        icon={Undo2}
        isDisabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        label="Redo"
        icon={Redo2}
        isDisabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}

// `next/dynamic` does not forward refs, so the shell passes react-hook-form's
// ref down as an ordinary prop instead.
export default function RichTextEditorImpl({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  forwardedRef,
}: RichTextEditorProps & { forwardedRef?: ForwardedRef<HTMLDivElement> }) {
  const editor = useMarkdownEditor({ value, onChange, placeholder });

  if (!editor) {
    return (
      <div
        className="min-h-[150px] animate-pulse rounded-md border bg-muted"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={forwardedRef}
      onBlur={onBlur}
      className={cn(
        "rounded-md border border-input bg-background ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
