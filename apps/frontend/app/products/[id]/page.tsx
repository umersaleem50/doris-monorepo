'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageGallery from '../../../Components/Stateless/ImageGallery/ImageGallery';
import NavigateLinks from '../../../Components/Stateless/NavigateLinks/NavigateLinks';
import axios from 'axios';
import Ratings from '../../../Components/Stateless/Ratings/Ratings';
import classes from './Product.module.scss';
import { Heading3, Paragraphy } from '../../../Utils/Typography/Typography';
import OnscreenError from '../../../Utils/Error/OnscreenError';
import SetSizesOptions from '../../../Components/Stateless/SetSizesOptions/SetSizesOptions';
import { BtnRectangleAccent } from '../../../Components/Stateless/Button/Button';
import ProductDetailContainer from './ProductDetailContainer/ProductDetailContainer';
import Review from '../../../Components/Stateless/Review/Review';
import StoreMap from '../../../Components/Stateless/StoreMap/StoreMap';
import { FiHeart as HeartIcon } from 'react-icons/fi';
import GridBox from '../../../Components/Stateless/GridBox/GridBox';
import LoadingOverlay from '../../../Utils/LoadingOverlay/LoadingOverlay';
import Store, { bagItemAction, favItemAction } from '../../../Store/Store';

import { useSelector } from 'react-redux';

interface IProduct {
  id: string;
  name: string;
  images: string[];
  rating: number;
  ratingsQuantity: number;
  productCode?: string;
  discount?: number;
  price: number;
  sizes: string[];
  productDetail: string;
  modelHeight: number;
  modelWear?: string;
  reviews: { user: any; rating: number; description: string }[];
  locations?: any;
}

const Page = () => {
  const links = [
    {
      text: 'Home',
      to: '/',
    },
    {
      text: 'Dresses',
      to: '/products/clothing?category=dress',
    },
  ];
  const params = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    images: [],
    id: '',
    price: 0,
    productDetail: '',
    rating: 0,
    ratingsQuantity: 0,
    sizes: [],
    discount: 0,
    locations: [],
    modelHeight: 100,
    modelWear: 'sx',
    productCode: '',
    reviews: [],
  });
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [isError, setIsError] = useState({ is: false, message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const StoreFavItems = useSelector((state: any) => state.favItem.items);
  const StoreBagItems = useSelector((state: any) => state.bagItem.items);
  const customClassesHeartIcon = [classes.HeartIcon];
  const sizeRef = useRef<HTMLParagraphElement>();
  const navigation = useRouter();
  {
    StoreFavItems.some((value: any) => product?.id === value.id) &&
      customClassesHeartIcon.push(classes.HeartIcon__filled);
  }

  const addItemToFav = (id: any) => {
    if (StoreFavItems.some((val: any) => val.id === id)) {
      Store.dispatch(favItemAction.removeItem(id));
      return;
    }
    Store.dispatch(favItemAction.addItem(id));
    // console.log("this is the state", items);
  };

  const addItemtoBag = (id: string, priceOfProduct: number, size = 's') => {
    if (StoreBagItems.includes(id)) {
      return;
    }
    Store.dispatch(bagItemAction.addItem({ id, price: priceOfProduct, size }));
  };

  const generateReviews = (
    reviews: {
      user: any;
      rating: number;
      description: string;
    }[]
  ) => {
    return reviews.map(({ user, rating, description }, i) => {
      return (
        <Review
          key={i}
          username={user.name}
          ratings={rating}
          profilePicture={user.profilePicture}
          review={description}
        />
      );
    });
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    setIsLoading(true);
    const request = async () => {
      const productId = params.id;
      try {
        const productData = await axios({
          url: `/api/v1/products/${productId}`,
        });

        const recommendProducts = await axios({
          // url: `/api/v1/products`,
          url: `/api/v1/products`,
          params: {
            fields: 'images,price,name,discount',
          },
        });

        setRecommendProducts(
          recommendProducts.data.data.filter((el: any) => {
            return productId !== el.id;
          })
        );

        setProduct(productData.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsError({
          is: true,
          message:
            'Something went wrong. Failed to connect to server. Please try again later!',
        });
        navigation.push('/404');
      }
    };

    request();
  }, [params.id]);

  return (
    <div className={classes.ProductSection}>
      {isLoading && <LoadingOverlay />}
      {/* //* If there is an error */}
      {isError.is && (
        <OnscreenError message={isError.message} toggle={isError.is} />
      )}
      {/* //* otherwise run this */}
      <NavigateLinks links={links} currentLink={product.name} />
      <div className={classes.ProductContainer}>
        {/* //* Product Images */}
        <div className={classes.ProductGallery}>
          {product.images && <ImageGallery images={product.images} />}
        </div>
        {/* //* Product details */}

        <div className={classes.ProductDetails}>
          <div className={classes.ProductDetails__container}>
            {product.rating && (
              <Ratings
                ratings={product.rating}
                ratingsQuntity={product.ratingsQuantity}
              />
            )}
            <Heading3 text={product.name} />
            <Paragraphy
              text={`Product Code: ${product.productCode}`}
              color="var(--color-secondary)"
            />
            <div className={classes.Prices}>
              <Heading3
                color="var(--color-accent)"
                bold
                style={{
                  color: !product.discount
                    ? 'var(--color-accent)'
                    : 'var(--color-light)',
                  textDecoration: product.discount ? 'line-through' : '',
                }}
              >
                {product.price} Rs.
              </Heading3>
              {product.discount && (
                <Heading3
                  text={`${product.price - product.discount} Rs.`}
                  color={'var(--color-urgent)'}
                  style={{ marginLeft: '1rem' }}
                  bold
                />
              )}
            </div>
          </div>

          <div className={classes.ProductDetails__container}>
            {product.sizes && (
              <SetSizesOptions options={product.sizes} ref={sizeRef} />
            )}
          </div>
          <div className={classes.CTA}>
            <BtnRectangleAccent
              text="Add to bag"
              customStyle={{ width: '30rem', textTransform: 'uppercase' }}
              upperCase
              clicked={(e) =>
                addItemtoBag(
                  product.id,
                  product.discount
                    ? product.price - product.discount
                    : product.price,
                  sizeRef?.current?.textContent.split(':')[1].trim()
                )
              }
            />
            <HeartIcon
              className={customClassesHeartIcon.join(' ')}
              onClick={(e) => addItemToFav(product.id)}
            />
          </div>

          <div className={classes.ProductDetails__container}>
            {product.productDetail &&
              ProductDetailContainer(
                () => (
                  <Paragraphy color="var(--color-secondary)">
                    {product.productDetail}
                  </Paragraphy>
                ),
                {
                  heading: 'Product Details',
                  show: true,
                }
              )}
          </div>
          <div className={classes.ProductDetails__container}>
            {product.modelHeight &&
              ProductDetailContainer(
                () => (
                  <>
                    <Paragraphy color="var(--color-secondary)">
                      <span>Model&apos;s height:</span> {product.modelHeight}
                      cm /{(product.modelHeight / 30.48).toFixed(1)}
                    </Paragraphy>
                    <Paragraphy color="var(--color-secondary)">
                      <span>Model wears:</span> {product.modelWear}
                    </Paragraphy>
                  </>
                ),
                {
                  heading: 'Size & Fit',
                  show: true,
                }
              )}
          </div>

          <div className={classes.ProductDetails__container}>
            {product.reviews &&
              ProductDetailContainer(
                () => <>{generateReviews(product.reviews)}</>,
                { heading: `Reviews (${product.ratingsQuantity || 0})` }
              )}
          </div>

          <div className={classes.ProductDetails__container}>
            {product.locations &&
              product.locations.length !== 0 &&
              ProductDetailContainer(
                () => <StoreMap locations={product.locations} />,
                {
                  heading: `Availabiltiy in stores`,
                  show: true,
                }
              )}
          </div>
        </div>

        {/* //* Render recommended slider */}
      </div>
      {recommendProducts.length !== 0 && (
        <GridBox data={recommendProducts} heading="You might also like" />
      )}
    </div>
  );
};

export default Page;
