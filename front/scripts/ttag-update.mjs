import path from 'node:path';
import { exec } from 'node:child_process';
import { readdirSync } from 'node:fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const localesDir = path.resolve(__dirname, '../src/i18n/source');

const localeFiles = readdirSync(localesDir);

localeFiles.forEach((locale) => {
  exec(`npm run ttag update ./src/i18n/source/${locale} ./src`, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Updated ${locale} translations list`);
  });
});
