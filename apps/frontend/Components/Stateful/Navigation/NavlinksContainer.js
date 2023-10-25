import { Component } from "react";
import { Heading6 } from "../../../Utils/Typography/Typography";
import CustomLink from "./navLinks/navLink/CustomLink";

class Navlinks_Container extends Component {
  // state = {
  //   isToggle: false,
  // };

  generateLinks(links, type) {
    // return links.map((link,i))
    return links.map((data, i) => (
      <CustomLink
        type={type}
        text={data.text}
        picture={data.picture}
        key={i}
        to={`/products${data.to}`}
      />
    ));
  }

  generateCategories(categories) {
    return categories.map((el, i) => (
      <div className="nav__container__category" key={i}>
        <Heading6 text={el.heading} upperCase bold />
        <div className="nav__container__category__box">
          {this.generateLinks(el.links, el.type)}
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="nav__container">
        <div className="nav__container__banner">
          {this.props.banner && (
            <img src={`/assets/${this.props.banner}`} alt="New Discount" />
          )}
        </div>

        {this.generateCategories(this.props.categories)}
      </div>
    );
  }
}

export default Navlinks_Container;
