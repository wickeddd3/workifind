import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        // `pl-6` matches the editor's own 1.5rem, so a list looks the same
        // being written as it does once posted.
        //
        // Markers sit outside rather than `list-inside`, which is what put a
        // wrapped bullet back on the left margin instead of hanging it under
        // its own text — visible on any job description with a bullet long
        // enough to run past one line.
        ul: (props) => <ul className="list-disc pl-6" {...props} />,
        // Tailwind's preflight strips list markers from `ol` as well, and only
        // `ul` was ever styled back. Numbered lists — which the editor offers a
        // button for — reached the page as an unmarked run of lines.
        ol: (props) => <ol className="list-decimal pl-6" {...props} />,
        a: (props) => (
          <a className="text-green-500 underline" target="_blank" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
