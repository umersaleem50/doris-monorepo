'use client';
import { Component } from 'react';
import { createRef } from 'react';
import { Heading5 } from '../../../../Utils/Typography/Typography';
import classes from './ProductDetailContainer.module.scss';

const ProductDetailContainer = (WrapperComponent, props) => {
  const MyComponent = class extends Component {
    constructor(props) {
      super();
      this.props = props;
      // this.props.show && this.toggleWrapper();
      this.istoggled = this.props.show ? true : false;
    }

    wrapperRef = createRef();
    buttonRef = createRef();
    // istoggled = false;

    toggleWrapper = () => {
      this.wrapperRef.current.classList.toggle(classes.WrapperContent__show);
      // *Change button text based on istoggle
      this.istoggled = !this.istoggled;
      if (this.istoggled) {
        return (this.buttonRef.current.textContent = '-');
      } else {
        // this.istoggled = true;
        return (this.buttonRef.current.textContent = '+');
      }
    };

    componentDidMount() {
      this.props.show && this.toggleWrapper();
      this.props.show &&
        this.wrapperRef.current.classList.add(classes.WrapperContent__show);
    }

    render() {
      return (
        <div className={classes.ProductDetailContainer}>
          <Heading5
            text={this.props.heading}
            upperCase
            bold
            color="var(--color-secondary)"
            style={{ marginBottom: '1rem' }}
            clicked={this.toggleWrapper.bind(this)}
          />
          <div className={classes.WrapperContent} ref={this.wrapperRef}>
            <WrapperComponent />
          </div>

          <button
            className={classes.BtnToggle}
            onClick={this.toggleWrapper}
            ref={this.buttonRef}
          >
            +
          </button>
        </div>
      );
    }
  };

  MyComponent.displayName = 'Product Details';
  return <MyComponent {...props} />;
};

export default ProductDetailContainer;
