export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-center text-xs text-gray-500 md:text-sm">
      &copy; {`${currentYear} workifind`}. All rights reserved.
    </p>
  );
}
