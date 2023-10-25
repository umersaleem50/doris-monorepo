import { useRef, useEffect } from "react";
import { Heading5 } from "../../../Utils/Typography/Typography";
import GridItem from "../GridItem/GridItem";
import classes from "./GridBox.module.scss";

const GridBox = (props) => {
  const renderElements = (data) => {
    return data.map((el, i) => {
      return (
        <GridItem
          image={el.images[0]}
          name={el.name}
          price={el.price}
          discount={el.discount}
          id={el.id}
          key={i}
          // ref={i === dataCopy.length - 1 ? autoSwitchItemRef : null}
        />
      );
    });
  };

  return (
    <div className={classes.Grid}>
      <Heading5 text={props.heading} upperCase />
      <div className={classes.GridBox}>{renderElements(props.data)}</div>
    </div>
  );
};

export default GridBox;
