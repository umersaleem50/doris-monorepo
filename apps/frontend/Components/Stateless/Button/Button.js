'use client';
import Link from 'next/link';
import classes from './Button.module.scss';

export const BtnCTA = (props) => {
  return (
    <button
      className={[classes.BtnCTA, props.customClasses].flat().join(' ')}
      onClick={props.btnClicked}
    >
      <span>{props.text || props.children}</span>
    </button>
  );
};

export const BtnRound = (props) => {
  let conditionClasses = [classes.BtnRound];
  conditionClasses.push(props.active ? classes.BtnRoundActive : '');
  conditionClasses = conditionClasses.join(' ');
  return (
    <button
      className={conditionClasses}
      onClick={props.btnClicked}
      style={props.customStyle}
    >
      {props.text || props.children}
    </button>
  );
};

export const LinkRound = (props) => {
  // let conditionClasses = [classes.BtnRound];
  // conditionClasses.push(props.active ? classes.BtnRoundActive : "");
  // conditionClasses = conditionClasses.join(" ");
  return (
    <Link
      className={classes.LinkRound}
      href={props.to}
      style={props.customStyle}
    >
      {props.children || props.text}
    </Link>
  );
};

export const BtnRectangle = (props) => {
  return (
    <button
      className={classes.btnRectangle}
      onClick={(e) => props.btnClicked}
      style={props.customStyle}
    >
      {props.text || props.children}
    </button>
  );
};

export const BtnRectangleStroke = (props) => {
  return (
    <Link
      className={classes.BtnRectangleStroke}
      href={props.to}
      style={props.customStyle}
    >
      {' '}
      {props.text || props.children}
    </Link>
  );
};

export const BtnRectangleAccent = (props) => {
  if (props.link) {
    return (
      <Link
        href={props.linkTo}
        className={classes.BtnRectangleAccent}
        style={props.customStyle}
      >
        {props.text || props.children}
      </Link>
    );
  }

  return (
    <button
      className={classes.BtnRectangleAccent}
      style={props.customStyle}
      onClick={props.clicked}
    >
      {props.text || props.children}
    </button>
  );
};
