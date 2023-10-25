import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BtnRectangleAccent } from "../../Components/Stateless/Button/Button";
import Image from "../../Components/Stateless/Image/Image";
import { Heading3, Paragraphy } from "../../Utils/Typography/Typography";
import Store from "../../Store";

import classes from "./Login.module.scss";
import { userAction } from "../../Store";
const Login = (props) => {
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const notificationRef = useRef();
  const navigation = useNavigate();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const [showSignUpForm, setSignUpForm] = useState(false);

  const clearFields = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const showNotification = (type, message) => {
    notificationRef.current.classList.add(classes["notification__show"]);
    if (type === "error")
      notificationRef.current.classList.add(classes.notification__error);
    notificationRef.current.textContent = message;

    if (type !== "error") clearFields();

    setTimeout(() => {
      notificationRef.current.classList.remove(classes.notification__error);
      notificationRef.current.classList.remove(classes.notification__show);
      if (type !== "error") {
        navigation("/");
      }
    }, 2000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    const name = nameRef.current?.value;
    try {
      if (showSignUpForm && passwordConfirm !== password)
        throw new Error("Password not match! Please confirm you password");

      const data = {
        email,
        password,
        ...(showSignUpForm ? { passwordConfirm, name } : {}),
      };
      console.log(data);
      const userData = await axios({
        url: `/api/v1/users/${!showSignUpForm ? "login" : "signup"}`,
        method: "post",
        data,
      });

      if (userData) {
        Store.dispatch(userAction.loginUser(userData.data.data.data));
        showNotification(
          "success",
          `${
            showSignUpForm ? "Sign up" : "Login"
          } successfully and you're redirecting!.`
        );
      }
    } catch (err) {
      if (showSignUpForm) return showNotification("error", err.message);
      let message = "Something went wrong!";
      if (`${err.response?.status}`.startsWith("4")) {
        message = "Invalid username or password!";
      }
      showNotification("error", message);
      // if(err.statusCode === 400)
    }
  };

  const SignUpForm = () => {
    return (
      <form ref={formRef} onSubmit={submitForm}>
        <Heading3 text="Welcome to Loomi" style={{ marginBottom: "1rem" }} />
        <Paragraphy
          text="Sign up and explore the world of loomi"
          color={"var(--color-secondary)"}
          style={{ marginBottom: "3rem" }}
        />
        <label htmlFor="name" className={classes.Label}>
          Fullname
        </label>
        <input
          ref={nameRef}
          type={"text"}
          required
          name="name"
          className={classes.Input}
        />
        <label htmlFor="email" className={classes.Label}>
          Email
        </label>
        <input
          ref={emailRef}
          type={"email"}
          required
          name="email"
          className={classes.Input}
        />

        <label htmlFor="password" className={classes.Label}>
          Password
        </label>
        <input
          ref={passwordRef}
          type={"password"}
          required
          name="password"
          className={classes.Input}
        />

        <label htmlFor="passwordConfirm" className={classes.Label}>
          Password
        </label>
        <input
          ref={passwordConfirmRef}
          type={"password"}
          required
          name="password"
          className={classes.Input}
        />
        <div className={classes.checkbox}>
          <input type={"checkbox"} required />
          <p>
            By creating your account, you agree to our
            <span> Terms and Conditions</span> & <span>private policy</span>.
          </p>
        </div>

        <BtnRectangleAccent text="SIGN UP" />
      </form>
    );
  };

  const LoginForm = () => {
    return (
      <form ref={formRef} onSubmit={submitForm}>
        <Heading3 text="Welcome to Loomi" style={{ marginBottom: "1rem" }} />
        <Paragraphy
          text="Enter your account details"
          color={"var(--color-secondary)"}
          style={{ marginBottom: "3rem" }}
        />
        <label htmlFor="email" className={classes.Label}>
          Email
        </label>
        <input
          ref={emailRef}
          type={"email"}
          required
          name="email"
          className={classes.Input}
        />

        <label htmlFor="password" className={classes.Label}>
          Password
        </label>
        <input
          ref={passwordRef}
          type={"password"}
          required
          name="password"
          className={classes.Input}
        />
        <div className={classes.checkbox}>
          <input type={"checkbox"} />
          <p>
            Remember me
            {/* <span>Terms and Conditions</span>& <span>private policy</span>. */}
          </p>
        </div>

        <BtnRectangleAccent text="SIGN IN" />
      </form>
    );
  };

  return (
    <div className={classes.Login}>
      <p className={classes.notification} ref={notificationRef}>
        {props.message}
      </p>
      <div className={classes.Login__image}>
        <Image src={"/assets/login.jpg"} />
      </div>
      <div className={classes.Login__container}>
        {(showSignUpForm && <SignUpForm />) || <LoginForm />}
        <Paragraphy color="var(--color-secondary)">
          {!showSignUpForm ? "Not register yet?" : "Already have an account?"}
          <button
            className={classes.btnSignUp}
            onClick={() => setSignUpForm(!showSignUpForm)}
          >
            {!showSignUpForm ? "Sign Up" : "Login"}
          </button>
        </Paragraphy>
      </div>
    </div>
  );
};

export default Login;
