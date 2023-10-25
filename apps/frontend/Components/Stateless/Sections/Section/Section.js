import { Heading3 } from "../../../../Utils/Typography/Typography";

const Section = (props) => {
  return (
    <section>
      <Heading3
        text={props.heading}
        upperCase
        style={{ textAlign: "center", marginBottom: "4rem" }}
      />
      {props.children}
    </section>
  );
};

export default Section;
