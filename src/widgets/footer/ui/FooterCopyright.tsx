export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-center text-xs text-muted-foreground md:text-sm">
      &copy; {`${currentYear} workifind`}. All rights reserved.
    </p>
  );
}
