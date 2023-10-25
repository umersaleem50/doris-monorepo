import Loading from "../Loading/Loading";
import classes from "./LoadingOverlay.module.scss";
const LoadingOverlay = (props) => {
  return (
    <div className={classes.Overlay}>
      <Loading />
    </div>
  );
};
export default LoadingOverlay;
