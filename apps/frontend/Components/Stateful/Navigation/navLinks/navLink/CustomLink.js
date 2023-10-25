import Link from 'next/link';
import { Heading6 } from '../../../../../Utils/Typography/Typography';
import classes from './CustomLink.module.scss';
import Image from 'next/image';
// import testImage from "../../../../../Assets/girl.jpg";

const CustomLink = (props) => {
  return (
    <Link href={props.to || '/products'} className={classes[props.type]}>
      {props.type && props.type.includes('picture') && (
        <div className={classes['image']}>
          <Image
            src={`/assets/${props.picture}`}
            alt={props.text}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      {props.type && props.type.includes('text') && (
        <Heading6 text={props.text} bold />
      )}
    </Link>
  );
};

export default CustomLink;
