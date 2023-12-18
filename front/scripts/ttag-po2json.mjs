import { exec } from 'node:child_process';

exec(
  './node_modules/ttag-cli/bin/ttag po2json ./src/i18n/source/en.po > ./src/i18n/locales/en.po.json',
  (err) => {
    if (err) {
      console.err(err);
      return;
    }
    console.log('Extracted EN translations to json');
  },
);

exec(
  './node_modules/ttag-cli/bin/ttag po2json ./src/i18n/source/de.po > ./src/i18n/locales/de.po.json',
  (err) => {
    if (err) {
      console.err(err);
      return;
    }

    console.log('Extracted DE translations to json');
  },
);
