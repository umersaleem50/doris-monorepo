'use client';
import { useRef } from 'react';
import { Heading3, Paragraphy } from '../../../Utils/Typography/Typography';
import { BtnRectangleAccent } from '../Button/Button';
import classes from './NewsLetter.module.scss';
const NewsLetter = (props) => {
  const ref = useRef();
  const submitForm = (e) => {
    e.preventDefault();
    alert('There is no newletter. But Thanks for giving a try.');
  };

  return (
    <div className={classes.NewsLetter}>
      <div className={classes.NewsLetter__form}>
        <Heading3 text="Get 20% off" upperCase />
        <Paragraphy
          text="Leave your email and get a discount"
          style={{ color: 'var(--color-secondary)' }}
        />
        <form onSubmit={submitForm}>
          <input
            type="email"
            className={classes.email}
            placeholder="Email"
            maxLength={64}
            ref={ref}
          />
          <BtnRectangleAccent text="subscribe" />
        </form>
      </div>

      <div className={classes.NewsLetter__image}>
        <img src="/assets/outerwear_category.jpg" alt="Girl in hood" />
      </div>
    </div>
  );
};

export default NewsLetter;
