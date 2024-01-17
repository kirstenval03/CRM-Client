import React, { useEffect, useRef } from 'react';
import VimeoPlayer from '@vimeo/player'; // Import VimeoPlayer class

function VimeoVideo({ videoId }) {
  const vimeoPlayerRef = useRef(null);

  useEffect(() => {
    const options = {
      id: videoId,
      autopause: 0, // Autopause off
    };

    const player = new VimeoPlayer('vimeo-player', options); // Use VimeoPlayer

    player.ready().then(() => {
      console.log('Vimeo player is ready');
    });

    return () => {
      player.destroy(); // Use destroy() instead of unload()
    };
  }, [videoId]);

  return <div id="vimeo-player"></div>;
}

export default VimeoVideo;
