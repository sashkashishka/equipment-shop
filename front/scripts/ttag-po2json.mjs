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
  './node_modules/ttag-cli/bin/ttag po2json ./src/i18n/source/sk.po > ./src/i18n/locales/sk.po.json',
  (err) => {
    if (err) {
      console.err(err);
      return;
    }

    console.log('Extracted SK translations to json');
  },
);
