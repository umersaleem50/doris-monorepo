import { Heading7, Paragraphy } from '../../../Utils/Typography/Typography';
import Image from 'next/image';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import {
  AiOutlinePlusCircle as PlusQuantity,
  AiOutlineMinusCircle as MinusQuantity,
} from 'react-icons/ai';
import classes from './FavItem.module.scss';
import { useRouter } from 'next/navigation';
import Store from '../../../Store/Store';
const FavItem = (props) => {
  const navigate = useRouter();

  const NavigateToProduct = (e) => {
    // alert("working");

    navigate.push(`/products/${props.id}`);
    {
      props.closeTab();
    }
  };

  const changeQuantity = (e, type) => {
    e.stopPropagation();

    Store.dispatch(type);
  };

  const removeCurrentItemFromStore = (id) => {
    Store.dispatch(props.action.removeItem(id));
  };

  return (
    <figure className={classes.FavItem} onClick={NavigateToProduct}>
      <TrashIcon
        className={classes.TrashIcon}
        onClick={(e) => {
          e.stopPropagation();
          removeCurrentItemFromStore(props.id);
        }}
      />
      <div className={classes.Image}>
        <Image
          src={`http:localhost:5500/images/products/small/${props.image}`}
          fill
          alt="product-image"
        />
      </div>
      <div className={classes.Container}>
        <div className={classes.Detail}>
          <div className={classes.Prices}>
            <Heading7
              color="var(--color-accent)"
              bold
              style={{
                color: !props.discount
                  ? 'var(--color-accent)'
                  : 'var(--color-light)',
                textDecoration: props.discount ? 'line-through' : '',
              }}
            >
              {props.price} $
            </Heading7>
            {props.discount && (
              <Heading7
                text={`${props.price - props.discount} $`}
                color={'var(--color-urgent)'}
                style={{ marginLeft: '1rem' }}
                bold
              />
            )}
          </div>
          <Paragraphy text={props.name} />
        </div>
        <div className={classes.Options}>
          <Paragraphy
            text={`Size: ${props.size}`}
            color="var(--color-secondary)"
          />
          <Paragraphy text={`Color: Default`} color="var(--color-secondary)" />
          <div className={classes.Quatity}>
            {props.quatity_button && (
              <PlusQuantity
                className={classes.Quatity__button}
                style={{ width: '2rem', height: '2rem' }}
                onClick={(e) =>
                  changeQuantity(e, props.action.increaseQuantity(props.id))
                }
              />
            )}
            <Paragraphy
              text={`Q-ty: ${props.quatity}`}
              color="var(--color-secondary)"
              style={{ margin: '0 1rem' }}
            />
            {props.quatity_button && (
              <MinusQuantity
                className={classes.Quatity__button}
                style={{ width: '2rem', height: '2rem' }}
                onClick={(e) =>
                  changeQuantity(e, props.action.decreaseQuantity(props.id))
                }
              />
            )}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default FavItem;
