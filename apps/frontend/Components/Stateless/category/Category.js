import Image from 'next/image';
import { Heading5, Paragraphy } from '../../../Utils/Typography/Typography';
import ImageBox from '../ImageBox/ImageBox';
import classes from './Category.module.scss';

const Category = (props) => {
  const categories = [
    {
      url: 'skirt',
      image: 'outerwear_category.jpg',
      text: 'Outerwear',
      type: 'clothing',
      categories: ['Raincoat', 'sweaters', 'etc'],
    },
    {
      url: 'shoe',
      image: 'shoe_category.jpg',
      text: 'Leather shoes',
      type: 'shoes',
      categories: ['heels', 'sandals', 'etc'],
    },
    {
      url: 'dress',
      image: 'light_dress_category.jpg',
      text: 'Light dresses',
      type: 'clothing',
      categories: ['Evening causal', 'Home'],
    },
  ];
  const generateCategories = (categories) => {
    return categories.map((category, i) => (
      <div className={classes.category} key={i}>
        <div className={classes['category__image']}>
          <ImageBox
            imageUrl={category.image}
            url={`products/${category.type}?category=${category.url}`}
            size="big"
          />

          {/* <Image
            src={`/assets/${category.image}`}
            fill
            alt="product-image"
            style={{ objectFit: 'cover' }}
          /> */}
        </div>
        <Heading5 text={category.text} bold style={{ margin: '1rem 0' }} />
        <Paragraphy
          text={category.categories.join(', ')}
          style={{ color: 'var(--color-secondary)' }}
        />
      </div>
    ));
  };
  return (
    <div className={classes.categories}>{generateCategories(categories)}</div>
  );
};

export default Category;
