import Image from 'next/image';
import {
  HEADING_HERO,
  Heading3,
} from '../../../../Utils/Typography/Typography';
import { BtnRectangle } from '../../Button/Button';
import classes from './NewArrival.module.scss';
const NewArrival = (props) => {
  return (
    <div className={classes.newArrival}>
      <div className={classes.newArrival__backdrop}>
        <Image src="/assets/backdrop2.jpg" alt="backdrop" fill />
        <video src="/assets/newarrival2.mp4" autoPlay loop muted></video>
      </div>

      <svg
        width="0"
        height="0"
        viewBox="0 0 786 1005"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="backdropSVG">
            <path
              d="M0 211C0 94.4679 94.4679 0 211 0V0C327.532 0 422 94.4679 422 211V550H0V211Z"
              fill="#363535"
            />
          </clipPath>
        </defs>
      </svg>

      <div className={classes.headings}>
        <HEADING_HERO
          text="new arrival"
          style={{
            fontSize: '10rem',
            color: 'var(--color-light)',
            textTransform: 'uppercase',
          }}
        />
        <Heading3
          text={`Fall ${new Date().getFullYear()}`}
          style={{
            color: 'var(--color-light)',

            textAlign: 'center',
          }}
          uppercase
        />
      </div>
      <HEADING_HERO
        className={classes.backdropHeading}
        text="new arrival"
        style={{
          fontSize: '20rem',
          opacity: '.2',
          position: 'absolute',
          top: '50%',
          left: '10%',
          zIndex: '1',
        }}
        bold
      />
      <BtnRectangle text="Explore" />
    </div>
  );
};

export default NewArrival;
