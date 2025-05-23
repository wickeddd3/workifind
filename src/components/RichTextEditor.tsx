"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface RichTextEditorProps extends EditorProps {
  initialState?: string;
}

export default forwardRef<unknown, RichTextEditorProps>(function RichTextEditor(
  { initialState, ...props },
  ref,
) {
  // Manage the editor state
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (initialState) {
      const contentState = ContentState.createFromText(initialState);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  // Handle editor state change
  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    if (props.onChange) {
      const contentState = state.getCurrentContent();
      props.onChange(convertToRaw(contentState));
    }
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      editorClassName={cn(
        "border rounded-md text-sm px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        props.editorClassName,
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r);
        } else if (ref) {
          ref.current = r;
        }
      }}
      {...props}
    />
  );
});
