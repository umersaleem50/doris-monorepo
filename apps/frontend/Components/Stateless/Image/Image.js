import { useState } from "react";
import classes from "./Image.module.scss";

const Image = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  const customClasses = [classes.Image];

  const onImageLoad = (e) => {
    setLoaded(true);
    props.onImageLoad && props.onImageLoad();
  };

  return (
    <div className={customClasses.join(" ")}>
      {!isLoaded && <div className={classes.Skeleton}></div>}
      {
        <img
          src={props.src}
          alt={props.alt || "Photo"}
          srcSet={props.srcSet}
          onLoad={onImageLoad}
        />
      }
    </div>
  );
};

export default Image;
