/// <reference types="vite-plugin-svgr/client" />

import { CSSProperties } from 'react';
import FlipX from './flip-x.svg?react';
import FlipY from './flip-y.svg?react';
import Play from './play.svg?react';
import Pause from './pause.svg?react';
import Logo from './logo.svg?react';
import fontSize from './font-size.svg?react';

const ICONS = {
  'flip-x': FlipX,
  'flip-y': FlipY,
  play: Play,
  pause: Pause,
  logo: Logo,
  'font-size': fontSize,
};

const Icon = ({
  name,
  ...rest
}: {
  className?: string;
  style?: CSSProperties;
  name: keyof typeof ICONS;
}) => {
  const Component = ICONS[name];
  return <Component {...rest} />;
};

export default Icon;
