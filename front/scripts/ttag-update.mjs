import { exec } from 'node:child_process';

exec('npm run ttag update ./src/i18n/source/en.po ./src', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Updated EN translations list');
});

exec('npm run ttag update ./src/i18n/source/de.po ./src', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Updated DE translations list');
});
