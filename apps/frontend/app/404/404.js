import { Link } from "react-router-dom";
import { Heading3, Heading5 } from "../../Utils/Typography/Typography";
import classes from "./404.module.scss";

const FOUR_O_FOUR = (props) => {
  return (
    <div className={classes.FourOFour}>
      <div className={classes.container}>
        <Heading3
          text="Looks like you got lost..."
          color="var(--color-secondary)"
        />
        <Heading5
          text="404"
          style={{ fontSize: "25rem" }}
          color="var(--color-accent)"
        />
        <Heading3
          text="Page Not Found!"
          style={{ marginBottom: "3rem" }}
          color="var(--color-secondary)"
        />
        <Link to={"/"} style={{ fontSize: "1.5rem" }}>
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default FOUR_O_FOUR;
