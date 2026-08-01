import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/shared/ui/button";

// Extends the Button's own props rather than raw button attributes, so
// `variant` and `size` reach it. Typed as HTMLButtonElement attributes before,
// which silently excluded both.
interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
