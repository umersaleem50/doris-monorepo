import Image from 'next/image';
import {
  Heading3,
  Heading5,
  HEADING_HERO,
} from '../../../../Utils/Typography/Typography';

import { BtnCTA } from '../../Button/Button';
import classes from './Header.module.scss';
const Header = () => {
  return (
    <header className={classes.header}>
      <Image src="/assets/hero.jpg" alt="Hero" fill />
      <video
        className={classes.video}
        src="/assets/hero-video.mp4"
        autoPlay
        muted
        loop
      />
      <HEADING_HERO text="Season" />
      <HEADING_HERO text="Sale" italic style={{ top: '50%' }} />
      <Heading5 text="UP TO" bold />
      <Heading3 text="-60%" />

      <BtnCTA text="shop now" customClasses={[classes['button']]} />

      <svg width="0" height="0">
        <defs>
          <clipPath id="heroSvg">
            <path
              d="M0 314.5C0 140.806 140.806 0 314.5 0H629V818H0V314.5Z"
              fill="#ffffff"
            />
          </clipPath>
        </defs>
      </svg>
    </header>
  );
};

export default Header;
