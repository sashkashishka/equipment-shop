export function getYoutubeThumb(
  id: string,
  size: 'small' | 'default' = 'default',
) {
  switch (size) {
    case 'small': {
      return `http://img.youtube.com/vi/${id}/2.jpg`;
    }

    default:
      return `http://img.youtube.com/vi/${id}/0.jpg`;
  }
}
