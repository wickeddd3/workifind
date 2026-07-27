"use client";

// Everything heavy lives here — the stylesheet, draft-js, and the editor
// itself. This module is only ever reached through the `next/dynamic` boundary
// in RichTextEditor.tsx, so none of it lands in the chunk of the form that
// renders the field.
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { ContentState, convertToRaw, EditorState } from "draft-js";
import { type ForwardedRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import { cn } from "@/shared/lib/utils";

import type { RichTextEditorProps } from "./RichTextEditor";

// `next/dynamic` does not forward refs, so the shell passes react-hook-form's
// ref down as an ordinary prop instead.
export default function RichTextEditorImpl({
  initialState,
  forwardedRef,
  ...props
}: RichTextEditorProps & { forwardedRef?: ForwardedRef<unknown> }) {
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
        if (typeof forwardedRef === "function") {
          forwardedRef(r);
        } else if (forwardedRef) {
          forwardedRef.current = r;
        }
      }}
      {...props}
    />
  );
}
