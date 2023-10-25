import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import GridBox from "../../Components/Stateless/GridBox/GridBox";
import classes from "./Cart.module.scss";
import FavItem from "../../Components/Stateless/FavItem/FavItem";
import {
  Heading3,
  Heading5,
  Paragraphy,
} from "../../Utils/Typography/Typography";
import { bagItemAction } from "../../Store";

import NavigateLinks from "../../Components/Stateless/NavigateLinks/NavigateLinks";
import Section from "../../Components/Stateless/Sections/Section/Section";
import NewsLetter from "../../Components/Stateless/NewsLetter/NewsLetter";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.bagItem.items);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [cartItemDetail, setCartItemDetail] = useState([]);

  let links = [
    {
      text: "Home",
      to: "/",
    },
  ];

  const actions = {
    removeItem: bagItemAction.removeItem,
    increaseQuantity: bagItemAction.increaseQuatity,
    decreaseQuantity: bagItemAction.decreaseQuatity,
  };

  useEffect(() => {
    const requestRecommended = async () => {
      try {
        const recommendProducts = await axios({
          // url: `/api/v1/products`,
          url: `/api/v1/products`,
          params: {
            fields: "images,price,name,discount",
          },
        });

        const storeItemId = cartItems.map((item) => item.id);

        setRecommendProducts(
          recommendProducts.data.data
            .filter((el) => {
              return !storeItemId.includes(el.id);
            })
            .splice(3)
        );
      } catch (err) {
        console.log(err);
      }
    };

    const cartRequest = async () => {
      //   const productId = params.id;
      try {
        const cartItemProductDetail = await Promise.all(
          cartItems.map((item, i) =>
            axios({ url: `/api/v1/products/${item.id}` })
          )
        );

        setCartItemDetail(cartItemProductDetail);
      } catch (err) {
        console.log(err);
      }
    };

    if (!recommendProducts || !recommendProducts.length) {
      requestRecommended();
    }

    cartRequest();
  }, [cartItems]);

  //Todo You need to add remove funtionality on cart items and also add discount heading to cart items

  const CartItems = () => {
    return (
      <div className={classes.CartItems}>
        <Heading3 text="my cart" upperCase style={{ marginBottom: "3rem" }} />

        {!cartItemDetail.length && (
          <Paragraphy
            text="Your cart is empty, Explore the store to add items."
            color="var(--color-secondary)"
            upperCase
          />
        )}

        {cartItemDetail
          .map((item, i) => {
            const resultOfEachProductRequest = item.data.data;
            resultOfEachProductRequest.cart_quatity = cartItems[i]?.quatity;

            resultOfEachProductRequest.product_Size_Cart = cartItems[i]?.size;
            return resultOfEachProductRequest;
          })
          .map((item, i) => (
            <FavItem
              price={item.discount ? item.price - item.discount : item.price}
              key={i}
              id={item.id}
              action={actions}
              quatity={item.cart_quatity}
              name={item.name}
              image={item.images[0]}
              description={item.description}
              size={item.product_Size_Cart}
              quatity_button={true}
            />
          ))}

        <div className={classes.TotalPrice}>
          <Heading5 text="Sub-total" bold />

          <Heading5
            text={
              cartItems
                .map((el, i) => {
                  return { price: el.priceOfProduct, quatity: el.quatity };
                })
                .reduce((prev, curr) => prev + curr.price * curr.quatity, 0) +
              " $"
            }
            bold
          />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.Cart}>
      <NavigateLinks links={links} currentLink="Cart" />
      <Section>
        <div className={classes.CartContainer}>
          <CartItems />
        </div>
      </Section>
      <Section>
        <GridBox data={recommendProducts} heading="You might also like" />
      </Section>
      <Section>
        <NewsLetter />
      </Section>
    </div>
  );
};

export default Cart;
