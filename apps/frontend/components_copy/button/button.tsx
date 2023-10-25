import styles from './button.module.scss';
import classes from './button.module.scss';
/* eslint-disable-next-line */
export interface ButtonProps {
  label?: string;
  primary?: boolean;
  backgroundColor: string;
  onClick: () => [];
}

export function Button(props: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: props.backgroundColor }}
      className={classes['button']}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default Button;
