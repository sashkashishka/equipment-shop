import path from 'node:path';
import { exec } from 'node:child_process';
import { readdirSync } from 'node:fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const localesDir = path.resolve(__dirname, '../src/i18n/source');

const localeFiles = readdirSync(localesDir);

localeFiles.forEach((locale) => {
  exec(
    `./node_modules/ttag-cli/bin/ttag po2json ./src/i18n/source/${locale} > ./src/i18n/locales/${locale}.json`,
    (err) => {
      if (err) {
        console.err(err);
        return;
      }
      console.log(`Extracted ${locale} translations to json`);
    },
  );
});
