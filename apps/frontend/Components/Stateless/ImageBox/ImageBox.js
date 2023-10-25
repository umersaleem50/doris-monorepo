'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import classes from './ImageBox.module.scss';
import Loading from '../../../Utils/Loading/Loading';
import Image from 'next/image';
const ImageBox = (props) => {
  const navigate = useRouter();

  const [isLoad, setIsLoad] = useState(false);
  const imageSrc =
    (props.imageUrl && `/assets/${props.imageUrl}`) ||
    `/images/products${props.size === 'small' ? '/small' : ''}/${props.image}`;
  return (
    <div
      className={
        (props.size === 'small' && classes.ImageBox__img) ||
        (props.size === 'medium' && classes.ImageBox__img__medium) ||
        classes.ImageBox__img__big
      }
      onClick={() =>
        navigate.push((props.url && props.url) || `/product/${props.productId}`)
      }
    >
      {/* //TODO: Fix Loading spinner */}

      {!isLoad && <Loading />}
      <Image
        src={imageSrc}
        alt={'Product'}
        onLoad={() => setIsLoad(true)}
        fill
      />
    </div>
  );
};

export default ImageBox;
