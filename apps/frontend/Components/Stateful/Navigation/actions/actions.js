import React from 'react';
import { useRef } from 'react';
import { FiHeart } from 'react-icons/fi';
import { IoBagRemoveOutline as CartIcon } from 'react-icons/io5';
import {
  BtnRectangleAccent,
  BtnRectangleStroke,
} from '../../../Stateless/Button/Button';
import Search from '../../Search/Search';
import FavItemsButton from './actionBtn/favItemsButton';
import { favItemAction, bagItemAction } from '../../../../Store/Store';
import Image from '../../../Stateless/Image/Image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import './actions.scss';

const Actions = (props) => {
  const searchRef = useRef();
  const inputSearch = useRef();
  const user = useSelector((state) => state.user.user);

  //TODO create checkout buttons and implement the route
  const CheckoutButtons = () => {
    return (
      <>
        <BtnRectangleStroke
          text="open cart"
          to="/cart"
          upperCase
          customStyle={{ marginTop: '3rem', marginRight: '3rem' }}
        />
        <BtnRectangleAccent
          text="Explore Store"
          customStyle={{ height: '5rem' }}
        />
      </>
    );
  };

  const searchToggled = (e) => {
    searchRef.current.classList.add('search__toggle');
    // console.log(inputSearch.current);
    setTimeout(() => {
      inputSearch.current.focus();
    }, 200);
    // inputSearch.current.focus();
  };

  const closeSearch = (e) => {
    searchRef.current.classList.remove('search__toggle');
  };

  return (
    <div ref={searchRef} className="actions">
      <Search
        searchToggled={searchToggled}
        closeSearch={closeSearch}
        url="/api/v1/products/search"
        innerRef={inputSearch}
      />
      {/* <FiHeart></FiHeart> */}
      {FavItemsButton(
        FiHeart,
        { heading: 'favroite items', action: favItemAction },
        'favItem'
      )}
      {FavItemsButton(
        CartIcon,
        {
          heading: 'Cart items',
          action: bagItemAction,
          otherElement: <CheckoutButtons />,
        },
        'bagItem'
      )}
      {user.profilePicture ? (
        <Link className="profilePicture" href={'/profile/me'}>
          <Image
            src={`/images/profile/${user.profilePicture}`}
            fill
            alt="user-profile"
          />
        </Link>
      ) : (
        <BtnRectangleAccent link linkTo="/login" text="Login" />
      )}
    </div>
  );
};

export default Actions;
