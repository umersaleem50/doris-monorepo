import { Paragraphy } from "../Typography/Typography";
import { IoClose as Close } from "react-icons/io5";
import classes from "./Error.module.scss";
import { useState, useRef } from "react";
import { useEffect } from "react";
const OnscreenError = (props) => {
  const [isClosed, setIsClosed] = useState(false);
  const loadingDiv = useRef();
  const customClasses = !props.success
    ? [classes.OnscreenError]
    : [classes.OnscreenError__success];
  props.toggle && !isClosed && customClasses.push(classes.OnscreenError__show);

  useEffect(() => {
    props.toggle && loadingDiv.current.classList.add(classes.Loading__show);
  }, []);

  setTimeout(() => {
    setIsClosed(true);
  }, 5000);

  return (
    <div className={customClasses.join(" ")}>
      <Close className={classes.Close} onClick={(e) => setIsClosed(true)} />
      <Paragraphy text={props.message} color="var(--color-white)" />
      <div className={classes.Loading} ref={loadingDiv}></div>
    </div>
  );
};

export default OnscreenError;
