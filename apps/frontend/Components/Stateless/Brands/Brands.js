import Image from 'next/image';
import classes from './Brands.module.scss';
const Brands = () => {
  const brands = ['tiffany', 'fendi', 'gucci', 'prada', 'rolex', 'd&g'];

  const generateBrandLogos = (brands) => {
    return brands.map((name, i) => (
      <div key={i} className={classes.brand}>
        <Image
          src={`/assets/icons/${name}.png`}
          alt={name}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    ));
  };
  return <div className={classes.brands}>{generateBrandLogos(brands)}</div>;
};

export default Brands;
