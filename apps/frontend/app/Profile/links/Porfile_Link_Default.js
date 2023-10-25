import axios from "axios";
import { useRef, useEffect } from "react";
import { BtnRectangleAccent } from "../../../Components/Stateless/Button/Button";
import { Label } from "../../../Utils/Input/Input";
import { TextBox } from "../../../Utils/Input/Input";
import { useHis } from "react-router-dom";
import classes from "./Profile_Link_Default.module.scss";

const Profile_Link_Default = (props) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const birthRef = useRef();
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

  useEffect(() => {
    const response = async () => {
      try {
        const user = await axios({
          url: "/api/v1/users/currentUser",
          method: "post",
        });
        const newDate = new Date(user.data.data.birthDate);
        fullNameRef.current.value = user.data.data.name;
        emailRef.current.value = user.data.data.email;

        birthRef.current.value = newDate.toISOString().split("T")[0];
        // birthRef.current.value = `${newDate.getFullYear()}-0${newDate.getMonth()}-0${newDate.getDate()}`;
      } catch (error) {
        console.log(error.message);
      }
    };
    response();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    // console.log("working");
    const name = fullNameRef.current.value;
    const email = emailRef.current.value;
    const birthDate = birthRef.current.value;

    const request = async () => {
      try {
        const user = await axios({
          url: "/api/v1/users/updateProfile",
          method: "patch",
          data: {
            name,
            email,
            birthDate: new Date(birthDate).toISOString(),
          },
        });
        console.log("submit");
        if (user) showNotification("success", "Profile updated successfully!");
      } catch (error) {
        alert(error.message);
      }
    };
    request();
  };
  return (
    <form onSubmit={submitForm}>
      <p className={classes.notification} ref={notificationRef}>
        {props.message}
      </p>
      <div className={classes.input}>
        <Label
          label="Fullname"
          htmlFor="fullname"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox
          id="fullname"
          required
          ref={fullNameRef}
          dataValue="test name"
        />
      </div>

      <div className={classes.input}>
        <Label
          label="Email"
          htmlFor="fullname"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox
          id="fullname"
          type="email"
          required
          ref={emailRef}
          dataValue="email"
        />
      </div>

      <div className={classes.input}>
        <Label
          label="Birthday"
          htmlFor="fullname"
          style={{ marginBottom: "1rem" }}
        />
        <TextBox id="fullname" type="date" required ref={birthRef} />
      </div>
      <BtnRectangleAccent
        text="Save Edits"
        customStyle={{ marginTop: "3rem" }}
      />
    </form>
  );
};

export default Profile_Link_Default;
