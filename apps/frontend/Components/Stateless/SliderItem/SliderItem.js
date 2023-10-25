'use client';
import { forwardRef } from 'react';
import { Heading7, Paragraphy } from '../../../Utils/Typography/Typography';

import classes from './SliderItem.module.scss';
import ImageBox from '../ImageBox/ImageBox';

const SliderItem = forwardRef((props, ref) => {
  return (
    <div className={classes.sliderItem} ref={ref}>
      <ImageBox productId={props.productId} image={props.image} size="small" />
      <Heading7 text={props.name} bold />
      <Paragraphy
        text={props.category[0]}
        style={{ color: 'var(--color-secondary)' }}
      />
      <div className={classes.sliderItem__prices}>
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

        {props.discount !== 0 && (
          <Paragraphy
            bold
            text={`${props.discount ? props.price - props.discount : ''} $`}
            style={{ color: 'var(--color-urgent)' }}
          />
        )}
      </div>
    </div>
  );
});

SliderItem.displayName = 'SliderItem';

export default SliderItem;
