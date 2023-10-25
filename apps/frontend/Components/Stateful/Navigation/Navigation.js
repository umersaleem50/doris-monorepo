'use client';
import { useRef } from 'react';
import Logo from '../../Stateless/Logo/Logo';
import Actions from './actions/actions';
import './_Navigation.scss';

import MainNav from './MainNav/MainNav';

const Navigation = () => {
  const navigationRef = useRef();
  return (
    <>
      <nav className="nav" ref={navigationRef}>
        <div className="nav__parentContainer">
          <Logo className="nav__logo" />

          <MainNav />
          <Actions className="nav__actions" />
        </div>
      </nav>
      {/* {this.state.containerToggle && (
        <Overlay onMouseOver={this.showContainerOnHover("hide")} />
      )} */}
    </>
  );
};

export default Navigation;
