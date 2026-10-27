/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Web3Forms access key for the playground's feedback form (set at build time, for example as a
   * GitHub Actions variable). Without it the Feedback button is hidden. The key is public by design:
   * it only lets the form send messages to the owner's address, which stays hidden.
   */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Absolute URL of the hosted playground (for `og:image`), for example `https://user.github.io/repo/`. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Package version from `package.json`, replaced at build time (`define` in `vite.config.ts`). */
declare const __WOP_VERSION__: string;
/** Package name from `package.json`, replaced at build time (`define` in `vite.config.ts`). */
declare const __WOP_PACKAGE_NAME__: string;
