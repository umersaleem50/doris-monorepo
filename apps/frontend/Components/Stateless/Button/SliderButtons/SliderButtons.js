import {
  BsChevronLeft as ArrowLeft,
  BsChevronRight as ArrowRight,
} from "react-icons/bs";
import classes from "./SliderButtons.module.scss";

const SliderButtons = (props) => {
  return (
    <div className={classes.slider__arrowBtns}>
      <button
        className={classes.slider__arrow}
        onClick={() => props.slideSliderLeft()}
        disabled={props.currentSlideNum === 0}
        // disabled={this.state.currentSlideNum === 0}
      >
        <ArrowLeft className={classes.slider__arrow__icon} />
      </button>

      <button
        className={classes.slider__arrow}
        onClick={() => props.slideSliderRight()}
      >
        <ArrowRight className={classes.slider__arrow__icon} />
      </button>
    </div>
  );
};
export default SliderButtons;
