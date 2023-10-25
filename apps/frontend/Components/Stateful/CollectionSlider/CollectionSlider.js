'use client';
import { Component } from 'react';
import { Heading5, Paragraphy } from '../../../Utils/Typography/Typography';
import classes from './CollectionSlider.module.scss';
import testData from '../../../Assets/testData.json';
import SliderButtons from '../../Stateless/Button/SliderButtons/SliderButtons';
//* IMPORT OptionsData from asset in form of json object
import collectionOptionSelector from '../../../Assets/collectionOptionSelector.json';
import { BtnRectangleStroke } from '../../Stateless/Button/Button';
import Image from 'next/image';

class CollectionSlider extends Component {
  state = {
    currentSlideNum: 0,
  };

  generateOptionSelectors(list) {
    return list.map((item, i) => {
      return (
        <div className={classes.OptionSelector} key={i}>
          <label key={i + 1 + 'label'} htmlFor={item.name}>
            {item.name}:
          </label>
          <select
            key={i + 2 + 'select'}
            name={item.name}
            onChange={(e) => console.log(e)}
          >
            {item.options.map((option, i) => (
              <option key={i + 1 + 'option'} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      );
    });
  }

  generateCollectionSlider(data) {
    const end = this.state.currentSlideNum + 2;
    const start = this.state.currentSlideNum;
    return data.slice(start, end).map((collection, i) => {
      return (
        <div className={classes.CollectionSlider__slider__image} key={i}>
          <Image
            src={`/assets/${collection.image}`}
            alt="Collection"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      );
    });
  }

  generateCollectionData(data) {
    return data.map((data, i) => {
      return (
        <div className={classes.CollectionSlider__collection} key={i}>
          <div className={classes.CollectionSlider__collection__image}>
            <Image
              src={`/assets/${data.image}`}
              alt={`Product ${i}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={classes.CollectionSlider__collection__details}>
            <Paragraphy text={`$${data.price}`} bold />
            <Paragraphy
              text={data.name}
              style={{ color: 'var(--color-secondary)' }}
            />
          </div>
        </div>
      );
    });
  }

  slideSliderRight() {
    if (this.state.currentSlideNum === testData.length - 2)
      return this.setState({ currentSlideNum: 0 });

    this.setState((prevState) => {
      return {
        currentSlideNum: prevState.currentSlideNum + 1,
      };
    });
  }

  slideSliderLeft() {
    if (this.state.currentSlideNum === 0) return;

    this.setState((prevState) => {
      return {
        currentSlideNum: prevState.currentSlideNum - 1,
      };
    });
  }

  render() {
    return (
      <div className={classes.CollectionSlider}>
        <div className={classes.CollectionSlider__options}>
          {this.generateOptionSelectors(collectionOptionSelector)}
        </div>
        <div className={classes.container}>
          <div className={classes.CollectionSlider__slider}>
            <div className={classes.CollectionSlider__slider__container}>
              {this.generateCollectionSlider(testData)}
            </div>
            <SliderButtons
              slideSliderLeft={this.slideSliderLeft.bind(this)}
              slideSliderRight={this.slideSliderRight.bind(this)}
              currentSlideNum={this.state.currentSlideNum}
            />
          </div>
          <div className={classes.CollectionData}>
            <Heading5 text="in this look" upperCase bold />
            <div className={classes.CollectionData__collections}>
              {this.generateCollectionData(
                testData[this.state.currentSlideNum].collections
              )}
            </div>
            <BtnRectangleStroke
              to={`/product/${testData[this.state.currentSlideNum].image}`}
              text="Buy it now"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionSlider;
