import classes from "./Profile.module.scss";
import NavigateLinks from "../../Components/Stateless/NavigateLinks/NavigateLinks";
import Image from "../../Components/Stateless/Image/Image";

import { useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import axios from "axios";
import Store, { userAction } from "../../Store";
import { Heading3 } from "../../Utils/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { createRef } from "react";
import { useParams } from "react-router-dom";

import linksObj from "../../Assets/profileLinks.json";
import { TextBox, Label } from "../../Utils/Input/Input";
import Profile_Link_Default from "./links/Porfile_Link_Default";
import Profile_Link_Security from "./links/Profile_Link_Security";
import Section from "../../Components/Stateless/Sections/Section/Section";

const Profile = (props) => {
  const user = useSelector((state) => state.user.user);
  const notificationRef = createRef();
  const linkId = useParams();

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("test");

  const generateLinks = (links) => {
    return links.map((link, i) => {
      let linkClasses = [];

      if (link.to === `/${linkId.id}`) linkClasses.push(classes.active);
      return (
        <button
          key={i}
          className={linkClasses.join("")}
          onClick={() => navigate(`/profile${link.to}`)}
        >
          {link.text}
        </button>
      );
    });
  };

  const signout = async () => {
    try {
      const logout = await axios({
        url: "/api/v1/users/signout",
        method: "post",
      });
      if (logout.status === 200) {
        navigate("/", { replace: true });
        Store.dispatch(userAction.loginUser({}));
      }
    } catch (error) {
      showNotification("error", "Something went wrong!");
    }
  };

  const submitImage = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("profilePicture", e.target.files[0]);
    try {
      const updateUser = await axios.patch(
        "/api/v1/users/updateProfile",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (updateUser.status === 200)
        Store.dispatch(userAction.loginUser(updateUser.data.data));
      console.log(updateUser);
    } catch (err) {
      showNotification("error", "Failed to update profile picture.");
    }
  };

  const showNotification = (type, message) => {
    notificationRef.current.classList.add(classes["notification__show"]);
    if (type === "error")
      notificationRef.current.classList.add(classes.notification__error);
    notificationRef.current.textContent = message;

    setTimeout(() => {
      notificationRef.current.classList.remove(classes.notification__error);
      notificationRef.current.classList.remove(classes.notification__show);
    }, 4000);
  };

  useEffect(() => {
    const response = async () => {
      try {
        const user = await axios({
          url: "/api/v1/users/currentUser",
          method: "post",
        });
        if (user) Store.dispatch(userAction.loginUser(user.data.data));
      } catch (err) {
        if (err) navigate("/login", { replace: true });
      }
    };

    response();
  }, []);

  const ProfileInfoFrom = () => {
    switch (linkId.id) {
      case "security":
        return <Profile_Link_Security />;

      default:
        return <Profile_Link_Default />;
    }
  };

  return (
    <div className={classes.Profile}>
      <p className={classes.notification} ref={notificationRef}>
        {props.message}
      </p>

      <NavigateLinks
        links={[{ to: "/", text: "Home" }]}
        currentLink="Profile"
      />
      <Section>
        <div className={classes.container}>
          <figure className={classes.container__profileBox}>
            <div className={classes.container__profileBox__box}>
              <div className={classes.container__profileBox__image}>
                <Image src={`/images/profile/${user.profilePicture}`} />
              </div>
              <label
                htmlFor="file-input"
                className={classes.customImageSelector}
              >
                <img src="/assets/icons/camera.png" />
              </label>
            </div>
            <input
              type={"file"}
              id="file-input"
              accept={".jpg,.jpeg,.png"}
              className={classes.Input__imageBtn}
              onChange={(e) => submitImage(e)}
            />
            <Heading3 text={user.name} upperCase color="var(--color-primary)" />
          </figure>
          <div className={classes.container__bottom}>
            <div className={classes.container__bottom__left}>
              {generateLinks(linksObj)}
              <button onClick={(e) => signout()}>Sign out</button>
            </div>
            <div className={classes.container__bottom__right}>
              <div className={classes.container__bottom__right__box}>
                <ProfileInfoFrom />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Profile;
