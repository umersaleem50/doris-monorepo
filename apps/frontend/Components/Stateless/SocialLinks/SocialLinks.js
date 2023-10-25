import {
  BsFacebook as Facebook,
  BsInstagram as Instagram,
  BsTwitter as Twitter,
  BsPinterest as Pintrest,
} from "react-icons/bs";

import classes from "./SocialLinks.module.scss";

const SocialLinks = (props) => {
  return (
    <div className={classes.SocialLinks}>
      <Facebook className={classes.Icon} />
      <Instagram className={classes.Icon} />
      <Twitter className={classes.Icon} />
      <Pintrest className={classes.Icon} />
    </div>
  );
};

export default SocialLinks;
