import { Heading5, Paragraphy } from "../../../Utils/Typography/Typography";
import Ratings from "../Ratings/Ratings";
import classes from "./Review.module.scss";
const Review = (props) => {
  return (
    <article className={classes.Review}>
      <div className={classes.UserProfile}>
        <img
          src={`/images/profile/${props.profilePicture}`}
          alt={`Photo of ${props.name}`}
        />
      </div>
      <Heading5 text={props.username} bold color="var(--color-urgent)" />
      <Paragraphy
        text={`"${props.review}"`}
        italic
        color="var(--color-secondary)"
      />
      <Ratings ratings={props.ratings} />
    </article>
  );
};

export default Review;
