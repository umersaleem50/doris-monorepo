'use client';
import classes from './Products.module.scss';
import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Heading5 } from '../../Utils/Typography/Typography';
// import linkData from '../../Assets/categories.json';
import { useEffect } from 'react';
import axios from 'axios';
import GridBox from '../../Components/Stateless/GridBox/GridBox';
import { filterOptions, IFilterOptions } from '../../dev-data/filterOptions';
import OnscreenError from '../../Utils/Error/OnscreenError';

const linkData: any = {
  shoes: [
    {
      name: 'View all',
      url: '',
    },
    {
      name: 'Formal Shoes',
      url: '/formal-shoes',
    },
    {
      name: 'Casual Shoes',
      url: '/casual-shoes',
    },
  ],
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const typeParams = useParams();
  const searchParams = useSearchParams();
  const [currentCategory, setCategory] = useState('');
  const [isError, setError] = useState('');
  const [options, setOptions] = useState<any>({
    sort: '-rating',
    sizes: 'xl',
    'price[lte]': 10000,
  });

  const generateCategory = (param: any) => {
    // return
    // if (!linkData[searchParams.get(param) || '']) return;
    return linkData['shoes'].map(
      // return linkData[searchParams.get(param) || ''].map(
      (link: any, i: number) => {
        const customClass = [classes.Category];
        if (link.url.toLowerCase() === currentCategory)
          customClass.push(classes.Category__active);
        return (
          <button
            className={customClass.join(' ')}
            key={i}
            onClick={(e) => {
              setCategory(link.url.toLowerCase());
            }}
          >
            {link.name}
          </button>
        );
      }
    );
  };

  const onOptionsChanged = (e: any, name: string) => {
    setOptions((prevState: any) => {
      const newState: any = { ...prevState };
      newState[name] = e.target.value || e.target.valueAsNumber;
      return newState;
    });
  };

  interface ICreateInput {
    type: 'select' | 'range';
    name: string;
    text: string;
    options: any;
  }

  const createInput = (item: any, i: number) => {
    switch (item.type) {
      case 'select':
        return (
          <div className={classes.OptionSelector} key={i}>
            <label htmlFor={item.name} className={classes.Option__label}>
              {item.text}:
            </label>
            <select
              id={item.name}
              className={classes[`input__${item.type}`]}
              onChange={(e) => {
                onOptionsChanged(e, item.name);
              }}
            >
              {item.options.map(
                (option: { value: string; name: string }, i: number) => {
                  return (
                    <option
                      key={i + 1 + 'option'}
                      value={option?.value}
                      className={classes.Option__option}
                    >
                      {option?.name}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        );

      case 'range':
        return (
          <div className={classes.OptionSelector}>
            <label htmlFor={item.name} className={classes.Option__label}>
              {`${item.text} Under ${options['price[lte]']} Rs.`}
            </label>
            <input
              type={'range'}
              min={item.options[0]}
              max={item.options[1]}
              value={options['price[lte]']}
              key={i * 199}
              className={classes.Option__Range}
              onChange={(e) => onOptionsChanged(e, item.name)}
            />
          </div>
        );

      default:
        break;
    }
  };

  const generateOptionSelectors = (list: ICreateInput[]) => {
    return (
      <div className={classes.Options}>
        {list.map((item, i) => {
          return createInput(item, i);
        })}
      </div>
    );
  };

  // const createParamsForProducts = () => {
  //   const defaultObj = {
  //     ...options,
  //   };
  //   if (currentCategory === '') return defaultObj;
  //   else {
  //     defaultObj.tags = currentCategory;
  //     return defaultObj;
  //   }
  // };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const request = async () => {
      //Todo this will make create the categoryLinks data base on the product type aka params
      // if (!linkData[typeParams.type]) return;

      try {
        const products = await axios({
          url: `/api/v1/products`,
          // url: `/api/v1/products?category=${typeParams.type}`,
          // params: createParamsForProducts(),
          params: options,
        });

        setProducts(products.data.data.reverse());
      } catch (err) {
        setError('Failed to connect to server. Please try again later!');
      }
    };

    request();
  }, [currentCategory, options, typeParams.type]);

  return (
    <>
      <div className={classes.Products}>
        {isError && <OnscreenError toggle message={isError} />}
        <div className={classes.Products__category}>
          <Heading5
            text="Categories"
            upperCase
            color="var(--color-brown)"
            bold
            style={{ marginBottom: '2rem' }}
          />

          <div className={classes.Categories}>
            {/* {generateCategory(typeParams.type)} */}
            {generateCategory('formal')}
            {/* {generateCategory("clothing")} */}
          </div>
        </div>
        <div className={classes.Products__container}>
          <div className={classes.Products__Options}>
            <Heading5
              text={`Results ${products.length}`}
              upperCase
              color="var(--color-brown)"
              bold
            />
            <div className={classes.Options}>
              {generateOptionSelectors(filterOptions)}
            </div>
          </div>
          {!products.length && (
            <p className={classes.ErrorText}>
              No product found matching your demand!
            </p>
          )}
          <GridBox data={products} />
        </div>
      </div>
    </>
  );
};

export default Products;
