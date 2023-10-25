import Link from 'next/link';
import classes from './NavigateLinks.module.scss';

const NavigateLinks = (props) => {
  return (
    <div className={classes.Links}>
      {props.links.map((link, i) => {
        return (
          <Link className={classes.Link} href={link.to} key={i}>
            {link.text} /
          </Link>
        );
      })}
      <div className={classes.productName}>{props.currentLink}</div>
    </div>
  );
};

export default NavigateLinks;
