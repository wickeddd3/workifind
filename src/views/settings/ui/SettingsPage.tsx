import { AccountSetting } from "./AccountSetting";
import { AppearanceSetting } from "./AppearanceSetting";

/**
 * Preferences that belong to the app rather than to the identity behind it.
 *
 * Deliberately reachable signed out: the theme is stored per browser and has
 * nothing to do with being logged in, and since the navbar no longer carries a
 * toggle this page is the only way for a visitor to change it.
 */
export function SettingsPage() {
  return (
    // Width, padding and gap match the profile and account pages.
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          How workifind looks and behaves for you.
        </p>
      </div>

      <AppearanceSetting />
      <AccountSetting />
    </section>
  );
}
