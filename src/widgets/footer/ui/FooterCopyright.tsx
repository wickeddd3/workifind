export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <h6 className="text-center text-xs font-semibold md:text-sm">
      &copy; {`${currentYear} workifind`}
    </h6>
  );
}
