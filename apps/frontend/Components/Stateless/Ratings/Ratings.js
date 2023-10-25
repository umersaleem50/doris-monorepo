import {
  TiStarFullOutline as FullStar,
  TiStarHalfOutline as HalfStar,
} from "react-icons/ti";
import { Paragraphy } from "../../../Utils/Typography/Typography";

import classes from "./Ratings.module.scss";

const Ratings = (props) => {
  const fullStars = Math.floor(props.ratings);

  const halfStar =
    props.ratings - fullStars > 0 ? (
      <HalfStar className={classes.HalfStar} />
    ) : null;

  return (
    <div className={classes.Ratings}>
      {new Array(fullStars).fill(1).map((el, i) => {
        return <FullStar className={classes.FullStar} key={i} />;
      })}
      {halfStar}
      {new Array(5 - Math.ceil(props.ratings)).fill(1).map((el, i) => {
        return (
          <FullStar
            className={[classes.FullStar, classes.FullStar__empty].join(" ")}
            key={i}
          />
        );
      })}

      <Paragraphy text={props.ratingsQuntity} />
    </div>
  );
};

export default Ratings;
