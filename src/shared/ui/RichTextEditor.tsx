"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
// Type-only, so it is erased at build time and pulls in no runtime code.
import { type EditorProps } from "react-draft-wysiwyg";

export interface RichTextEditorProps extends EditorProps {
  initialState?: string;
}

// draft-js and the editor stylesheet used to sit at this module's top level.
// Because the forms import this file statically, both landed in the form's
// chunk regardless of the dynamic() around the Editor — the deferral only
// covered react-draft-wysiwyg's own component. Moving the whole implementation
// behind the boundary defers the stylesheet and draft-js with it.
const RichTextEditorImpl = dynamic(() => import("./RichTextEditorImpl"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[150px] animate-pulse rounded-md border bg-muted"
      aria-hidden="true"
    />
  ),
});

export default forwardRef<unknown, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    return <RichTextEditorImpl {...props} forwardedRef={ref} />;
  },
);
