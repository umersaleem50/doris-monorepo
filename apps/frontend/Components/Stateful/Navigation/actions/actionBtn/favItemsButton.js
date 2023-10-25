import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoCloseOutline as BtnClose } from 'react-icons/io5';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  Heading5,
  Paragraphy,
} from '../../../../../Utils/Typography/Typography';
import FavItem from '../../../../Stateless/FavItem/FavItem';

import './favItemsButton.scss';

const FavItemsButton = (IconComponent, props, storeLocation) => {
  const ActionComponent = (props) => {
    const [getProducts, setProducts] = useState([]);
    const [isToggle, setToggle] = useState(false);
    const storeFavItem = useSelector((state) => state[storeLocation].items);

    const closeFavTab = () => {
      setToggle(!isToggle);
    };

    const generateResults = (items) => {
      if (!items || items.length === 0)
        return (
          <Paragraphy
            text="No item exist. Explore the store to have some."
            color="var(--color-secondary)"
            style={{ margin: '2rem 0' }}
          />
        );

      return items.map((item, i) => (
        <FavItem
          price={item.discount ? item.price - item.discount : item.price}
          key={i}
          id={item.id}
          action={props.action}
          quatity={item.cart_quatity}
          // src={`/images/products/small/${item.images[0]}`}
          name={item.name}
          image={item.images[0]}
          description={item.description}
          size={item.product_Size_Cart}
          closeTab={closeFavTab}
        />
      ));
    };

    useEffect(() => {
      const requestAllFavProducts = async () => {
        try {
          const results = await Promise.all(
            storeFavItem.map((item) =>
              axios({ url: `/api/v1/products/${item.id}`, method: 'get' })
            )
          );

          const requestData = results.map((product, i) => {
            const eachProduct = product.data.data;

            eachProduct.cart_quatity = storeFavItem[i].quatity || 1;
            eachProduct.product_Size_Cart = storeFavItem[i].size || 's';
            return eachProduct;
          });
          setProducts(requestData);
        } catch (error) {
          console.log(error);
        }
      };

      requestAllFavProducts();
    }, [storeFavItem]);

    return (
      // <IconComponent />
      <React.Fragment>
        <div className="actionBtn">
          <div className="NumOfItems">
            <Paragraphy
              text={getProducts.length}
              color="var(--color-white)"
              bold
            />
          </div>
          <IconComponent
            className="actionBtn__icon"
            size={'2rem'}
            color={'var(--color-primary)'}
            fill={isToggle ? `var(--color-primary)` : 'transparent'}
            onClick={closeFavTab}
          />
          {isToggle && (
            <div className="actionBtn__box">
              <div className="actionBtn__box__top">
                <Heading5
                  text={props.heading}
                  style={{ marginBottom: '2rem' }}
                  upperCase
                  bold
                />
                <BtnClose
                  size={'2rem'}
                  color={'var(--color-primary)'}
                  onClick={closeFavTab}
                  style={{ marginTop: '-1.5rem' }}
                />
              </div>
              <div className="actionBtn__box__items">
                {generateResults(getProducts)}
              </div>
              {props.otherElement && props.otherElement}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };
  return <ActionComponent {...props}></ActionComponent>;
};

export default FavItemsButton;
