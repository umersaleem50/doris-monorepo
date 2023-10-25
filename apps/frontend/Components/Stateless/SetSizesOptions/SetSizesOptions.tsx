'use client';
import { useState } from 'react';
import React from 'react';
import classes from './SetSizesOptions.module.scss';
const SetSizesOptions = React.forwardRef(
  (props: { options: string[] }, ref) => {
    const [currentSize, setSize] = useState(props.options[0]);

    const allOptions = ['xs', 's', 'm', 'l', 'xl'];

    const isClicked = (size: string) => {
      // alert(size);
      if (!props.options.includes(size)) return;
      setSize(size);
    };

    const generateOptions = (data: string[]) => {
      return data.map((option, i) => {
        const customClasses = [classes.Option];

        option === currentSize && customClasses.push(classes.Active);
        !props.options.includes(option) && customClasses.push(classes.Disabled);

        return (
          <p
            className={customClasses.join(' ')}
            onClick={() => isClicked(option)}
            key={i}
          >
            {option}
          </p>
        );
      });
    };

    return (
      <div className={classes.Sizes}>
        <p className={classes.CurrentSize} ref={ref}>
          <span>Size: </span>
          {currentSize}
        </p>
        <div className={classes.Options}>{generateOptions(allOptions)}</div>
      </div>
    );
  }
);

SetSizesOptions.displayName = 'Size Options';

export default SetSizesOptions;
