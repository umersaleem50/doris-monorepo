'use client';
import { Component, createRef } from 'react';
import React from 'react';
import { BtnRound, LinkRound } from '../../Stateless/Button/Button';
import classes from './Slider.module.scss';
import axios from 'axios';

import SliderButtons from '../../Stateless/Button/SliderButtons/SliderButtons';

const Slider = (SliderElement, ...props) => {
  class SliderClass extends Component {
    constructor(props) {
      super();
      this.props = props;
    }
    state = {
      currentParam: undefined,
      fetchedProducts: [],
      products: [],
      currentSlideNum: 0,
      errorMsg: '',
    };

    sliderContainerRef = createRef();
    sliderRef = createRef();
    productRef = createRef();

    btnList = [
      { text: 'All', param: undefined },
      { text: 'Dresses', param: 'dress' },
      { text: 'Skirts', param: 'skirt' },
      { text: 'Shoes', param: 'shoe' },
      { text: 'Accessories', param: 'accessories' },
    ];

    updateList(param) {
      //! Not a good method to request for each request
      //fetch data for every update
      // this.fetchDataFromServer(param).then((products) =>
      //   this.setState({ products: products.data.data, currentParam: param })
      // );

      /*
      //** More better way of updating data. Once data will be fetched form server in Component
      //* ShouldUpdate.
      */

      if (!param) {
        this.setState({
          products: this.state.fetchedProducts,
          currentParam: param,
          currentSlideNum: 0,
        });
        this.slideSlider(0);
        return;
      }
      const products = this.state.fetchedProducts
        .reverse()
        .filter((product) => product.category.includes(param));
      this.slideSlider(0);
      this.setState({
        products,
        currentParam: param,
        currentSlideNum: 0,
      });
    }

    generateProducts(products) {
      if (!products || !products.length)
        return (
          <p className={classes.slider__message}>
            {this.state.errorMsg ||
              'There is no product available belong to this category.'}
          </p>
        );
      return products.map((product, i) => (
        <SliderElement
          ref={i === 0 ? this.productRef : null}
          productId={product.id}
          name={product.name}
          image={product.images[0]}
          category={product.category}
          discount={product.discount}
          price={product.price}
          key={i}
        />
      ));
    }

    generateButtons(btnList) {
      return btnList.map((btn, i) => {
        return (
          <BtnRound
            text={btn.text}
            active={this.state.currentParam === btn.param}
            customStyle={{ marginRight: '1.5rem' }}
            btnClicked={() => this.updateList(btn.param)}
            key={i}
          />
        );
      });
    }

    shouldComponentUpdate(nextProps, nextStates) {
      if (nextStates === this.state) return false;
      return true;
    }

    fetchDataFromServer() {
      return async function () {
        try {
          const products = await axios({
            method: 'GET',
            url: this.props.url || '/api/v1/products',
          });

          return products.data.data;
        } catch (err) {
          this.setState({
            errorMsg: 'Something went wrong. Please try again later!',
          });
          console.log(err);
          return [];
        }
      }.call(this);
    }

    componentDidMount() {
      this.fetchDataFromServer().then((products) =>
        this.setState({
          fetchedProducts: products || [],
          products: [...products].reverse() || [],
        })
      );
    }

    slideSlider(slideNumber) {
      if (this.state.products.length === 0) return;
      const containerWidth = this.sliderContainerRef.current.offsetWidth;
      const sliderWidth = this.sliderRef.current.offsetWidth;
      const productWidth = this.productRef.current.offsetWidth;

      if (containerWidth < sliderWidth) return;

      this.sliderContainerRef.current.style.left = `${
        productWidth * slideNumber + (30 * slideNumber - 1)
      }px`;
      this.setState({ currentSlideNum: slideNumber });
    }

    slideSliderRight() {
      const numOfProductToDisplay = Math.floor(
        this.sliderRef.current.offsetWidth /
          this.productRef?.current?.offsetWidth
      );
      if (
        this.state.currentSlideNum ===
        this.state.products.length * -1 + numOfProductToDisplay
      ) {
        this.slideSlider(0);

        return;
      }
      this.slideSlider(this.state.currentSlideNum - 1);
    }

    slideSliderLeft() {
      if (this.state.currentSlideNum === 0) return;
      this.slideSlider(this.state.currentSlideNum + 1);
    }

    render() {
      return (
        <div className={classes.slider}>
          <div className={classes.slider__buttons}>
            {this.generateButtons(this.btnList)}
          </div>
          <div className={classes.slider__products} ref={this.sliderRef}>
            <div
              className={classes.slider__products__container}
              ref={this.sliderContainerRef}
            >
              {/* //* This will generate the products using method. */}
              {this.generateProducts(this.state.products)}
            </div>
          </div>

          {!this.props.hideButtons && (
            <SliderButtons
              slideSliderLeft={this.slideSliderLeft.bind(this)}
              slideSliderRight={this.slideSliderRight.bind(this)}
              currentSlideNum={this.state.currentSlideNum}
            />
          )}

          {/* //* This is a button at the bottom of slider to get all products on other page. */}
          <LinkRound
            to="/products/clothing"
            text="Shop the trends"
            customStyle={{ margin: '0 auto' }}
          />
        </div>
      );
    }
  }

  return <SliderClass {...props} />;
};

export default Slider;
