import { Heading5, Paragraphy } from "../../../../Utils/Typography/Typography";
import classes from "./DetailSection.module.scss";
const DetailSection = (props) => {
  const details = [
    {
      heading: "Free Shipping",
      detail:
        "We provide free shipping worldwide to our happy customers. So you don't need to pay extra charges to our products.",
    },
    {
      heading: "Secure payments",
      detail:
        "Our system is so secure that you don't need to worry about your payments. Your payments will be secure as always.",
    },
    {
      heading: "Best ECO quality",
      detail:
        "If your looking for premium quality products, there in no brand like loomi. We provide premium quality on every product.",
    },
  ];
  const generateDetails = (details) => {
    return details.map((el, i) => {
      return (
        <div className={classes.Detail} key={i}>
          <Heading5 text={el.heading} bold />
          <Paragraphy
            text={el.detail}
            style={{ color: "var(--color-secondary)", marginTop: "2rem" }}
          />
        </div>
      );
    });
  };
  return (
    <div className={classes.DetailSection}>
      <div className={classes.Details}>{generateDetails(details)}</div>
    </div>
  );
};

export default DetailSection;
