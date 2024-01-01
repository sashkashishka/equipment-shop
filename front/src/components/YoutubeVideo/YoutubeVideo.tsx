'use client';

import { useState } from 'react';
import cn from 'classnames';

import { getYoutubeId } from '@/utils/youtube/getYoutubeId';
import { getYoutubeThumb } from '@/utils/youtube/getYoutubeThumb';

import YoutubeButtonIcon from '@/images/icons/youtube-button.svg';

import styles from './YoutubeVideo.module.css';

interface iProps {
  name: string;
  link: string;
  className?: string;
  width?: string;
  height?: string;
  showYoutubeBtn?: boolean;
  handleClick?(): void;
}

export function YoutubeThumb({
  className,
  link,
  name,
  height,
  width,
  showYoutubeBtn = true,
  handleClick,
}: iProps) {
  const videoId = getYoutubeId(link);

  return (
    <div className={cn(styles.container, className)} onClick={handleClick}>
      <img
        src={getYoutubeThumb(videoId)}
        alt={name}
        width={width}
        height={height}
        className={styles.thumb}
      />
      {showYoutubeBtn && (
        <YoutubeButtonIcon
          width="68px"
          height="48px"
          className={styles.youtubeBtn}
        />
      )}
    </div>
  );
}

export function YoutubeVideo({ link, className, name, width, height }: iProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYoutubeId(link);

  if (isPlaying) {
    return (
      <iframe
        width={width}
        height={height}
        className={className}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
        allowFullScreen
      />
    );
  }

  return (
    <YoutubeThumb
      className={className}
      width={width}
      height={height}
      link={link}
      name={name}
      handleClick={() => setIsPlaying(true)}
    />
  );
}
