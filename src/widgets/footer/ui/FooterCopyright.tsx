export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-center text-xs font-semibold md:text-sm">
      &copy; {`${currentYear} workifind`}
    </p>
  );
}
