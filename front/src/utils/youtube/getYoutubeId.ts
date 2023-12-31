export function getYoutubeId(youtubeLink: string): string {
  let ID: any = '';
  const url = youtubeLink
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }

  return ID;
}
