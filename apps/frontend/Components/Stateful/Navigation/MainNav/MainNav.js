import { Component } from "react";
import NavlinksContainer from "../NavlinksContainer";
import Navlinks from "../navLinks/Navlinks";
import navlink_data from "../../../../Assets/navlinks-data.json";

class MainNav extends Component {
  state = {
    containerToggle: false,
    currentNavLink: navlink_data["sales"],
  };

  links = [
    "sales",
    "new in",
    "clothing",
    "shoes",
    "accessories",
    "gifts",
    "collections",
  ];

  showContainerOnHover = (e, type) => {
    if (type === "show") this.setState({ containerToggle: true });
    else this.setState({ containerToggle: false });
  };

  render() {
    return (
      <nav
        className="nav__links"
        onMouseEnter={(e) => this.showContainerOnHover(e, "show")}
        onMouseLeave={(e) => this.showContainerOnHover(e, "hide")}
      >
        <Navlinks links={this.links} />
        {this.state.containerToggle && (
          <NavlinksContainer
            className="nav__container"
            banner={this.state.currentNavLink.banner}
            categories={this.state.currentNavLink.categories}
          />
        )}
      </nav>
    );
  }
}

export default MainNav;
