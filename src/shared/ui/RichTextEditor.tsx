"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";

export interface RichTextEditorProps {
  /** The current value, as Markdown. */
  value?: string;
  /** Called with the edited Markdown on every change. */
  onChange?: (markdown: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  /** Applied to the bordered wrapper, not the editable area. */
  className?: string;
}

// Tiptap, ProseMirror and the markdown serializer used to sit at this module's
// top level as draft-js once did. Because the forms import this file
// statically, all of it landed in the form's chunk regardless of the dynamic()
// around the editor. Keeping the whole implementation behind the boundary is
// what defers it.
const RichTextEditorImpl = dynamic(() => import("./RichTextEditorImpl"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[150px] animate-pulse rounded-md border bg-muted"
      aria-hidden="true"
    />
  ),
});

export default forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    return <RichTextEditorImpl {...props} forwardedRef={ref} />;
  },
);
