import { useRouter } from 'next/navigation';
import classes from './GridItem.module.scss';
import Image from 'next/image';

import { Heading5, Paragraphy } from '../../../Utils/Typography/Typography';
const GridItem = (props) => {
  const navigate = useRouter();

  return (
    <figure
      className={classes.GridItem}
      onClick={(e) => navigate.push(`/products/${props.id}`)}
    >
      <div className={classes.Imagebox}>
        <Image
          src={`http:localhost:5500/images/products/small/${props.image}`}
          alt={props.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <Heading5 text={props.name} color="var(--color-brown)" bold />
      <div className={classes.GridItem__prices}>
        <Paragraphy
          bold
          text={`${props.price} $`}
          style={{
            color: !props.discount
              ? 'var(--color-accent)'
              : 'var(--color-light)',
            textDecoration: props.discount ? 'line-through' : '',
          }}
        >
          {props.price}$
        </Paragraphy>
        {props.discount && props.discount !== 0 && (
          <Paragraphy
            bold
            text={`${props.price - props.discount} $`}
            style={{ color: 'var(--color-urgent)' }}
          />
        )}
      </div>
    </figure>
  );
};

export default GridItem;
