import { Heading6 } from "../Typography/Typography";
import classes from "./Error.module.scss";

const Error = (props) => {
  const errorClasses = [classes.error, classes[`error--${props.type}`]];
  //   const ErrorComponent = (errProps) => {
  //     return <div className={errorClasses}>{errProps.message}</div>;
  //   };

  //   return class extends Component {
  //     constructor() {
  //       super();

  //       this.state = { show: false };
  //     }

  //     render() {
  return (
    // <WrapperComponent className={classes.Wrapper}>
    //   <ErrorComponent message={this.props.message} />
    // </WrapperComponent>
    <div className={errorClasses.join(" ")}>
      <Heading6 text={props.message} />
    </div>
  );
  //     }
  //   };
};

export default Error;
