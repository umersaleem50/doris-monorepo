import { Heading5 } from "../../../Utils/Typography/Typography";
import { Label, TextBox } from "../../../Utils/Input/Input";
import { BtnRectangleAccent } from "../../../Components/Stateless/Button/Button";
import classes from "./Profile_Link_Security.module.scss";
import { useRef } from "react";
import axios from "axios";

const Profile_Link_Security = (props) => {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const notificationRef = useRef();

  const showNotification = (type, message) => {
    notificationRef.current.classList.add(classes["notification__show"]);

    if (type === "error")
      notificationRef.current.classList.add(classes.notification__error);
    notificationRef.current.textContent = message;

    setTimeout(() => {
      notificationRef.current.classList.remove(classes.notification__error);
      notificationRef.current.classList.remove(classes.notification__show);
    }, 2000);
  };

  const clearFields = () => {
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const submitForm = (e) => {
    e.preventDefault();
    const oldPassword = currentPasswordRef.current.value;
    const password = newPasswordRef.current.value;
    const passwordConfirm = confirmPasswordRef.current.value;

    console.log({ oldPassword, password, passwordConfirm });
    const request = async () => {
      try {
        const user = await axios({
          url: "/api/v1/users/changePassword",
          method: "post",
          data: {
            oldPassword,
            password,
            passwordConfirm,
          },
        });
        if (user) {
          clearFields();    
          showNotification("success", "Password update successfully!");
        }
      } catch (error) {
        showNotification("error", "Failed to update password!");
      }
    };

    request();
  };

  return (
    <form onSubmit={submitForm}>
      <p className={classes.notification} ref={notificationRef}>
        {props.message}
      </p>
      <Heading5
        text="Change Password"
        upperCase
        bold
        style={{ marginBottom: "2rem" }}
      />

      <div className={classes.input}>
        <Label
          label="Current password"
          htmlFor="password"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox
          id="password"
          type="password"
          required
          ref={currentPasswordRef}
        />
      </div>

      <div className={classes.input}>
        <Label
          label="New Password"
          htmlFor="newpassword"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox
          id="newpassword"
          type="password"
          required
          ref={newPasswordRef}
        />
      </div>

      <div className={classes.input}>
        <Label
          label="Confirm Password"
          htmlFor="confirmPassword"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox
          id="confirmPassword"
          type="password"
          required
          ref={confirmPasswordRef}
        />
      </div>
      <BtnRectangleAccent
        text="Update Password"
        customStyle={{ marginTop: "3rem" }}
      />
    </form>
  );
};

export default Profile_Link_Security;
