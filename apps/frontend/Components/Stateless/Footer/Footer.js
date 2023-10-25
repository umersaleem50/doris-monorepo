import { Link } from "react-router-dom";
import linkData from "../../../Assets/footerLinks.json";
import { Heading5, Paragraphy } from "../../../Utils/Typography/Typography";
import SocialLinks from "../SocialLinks/SocialLinks";
import classes from "./Footer.module.scss";
const Footer = (props) => {
  const generateLinks = (data) => {
    return data.map((el, i) => {
      return (
        <div className={classes.Box} key={i}>
          <Heading5
            text={el.heading}
            upperCase
            bold
            style={{ marginBottom: "4rem" }}
          />

          <ul className={classes.Links}>
            {el.links.map((link, i) => {
              return (
                <Link className={classes.Link} to={link.url} key={i}>
                  <Paragraphy text={link.text} />
                </Link>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <footer className={classes.Footer}>
      <div className={classes.Container}>{generateLinks(linkData)}</div>
      <div className={classes.BottomContainer}>
        <SocialLinks />
      </div>
      <div className={classes.CopyContainer}>
        <div className={classes.Copywrite}>
          &copy; 2021 Loomi.
          <span>
            Developed by{" "}
            <a
              target={"_blank"}
              href="https://www.linkedin.com/in/umersaleem50/"
              rel="noreferrer"
            >
              Umar Saleem
            </a>
            . Designed by{" "}
            <a
              target={"_blank"}
              href="https://www.figma.com/@squart"
              rel="noreferrer"
            >
              Roman Cherepivskiy
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
