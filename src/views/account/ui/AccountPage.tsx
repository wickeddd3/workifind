import { ManageAccount } from "./ManageAccount";

/**
 * The account you sign in with — email, password, connected accounts, active
 * devices. Distinct from the profile, which is what employers or candidates
 * read about you; the heading says so outright, because "account" and
 * "profile" are the two words users most reliably swap.
 */
export function AccountPage() {
  return (
    // Width, padding and gap match the profile and settings pages — the three
    // are reached from the same menu and should not shift when moving between
    // them.
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          Manage account
        </h1>
        <p className="text-sm text-muted-foreground">
          Your sign-in details, connected accounts and security. To change what
          others see about you, edit your profile instead.
        </p>
      </div>

      <ManageAccount />
    </section>
  );
}
