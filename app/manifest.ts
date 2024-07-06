import { MetadataRoute } from 'next';

export const appName = 'UNICT Telegram Hub';
export const appDescription = 'The platform to find out all the telegram links associated to UNICT';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: 'UTH',
    description: appDescription,
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icons/16px.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/icons/32px.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/icons/128px.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/icons/192px.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/256px.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icons/512px.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
