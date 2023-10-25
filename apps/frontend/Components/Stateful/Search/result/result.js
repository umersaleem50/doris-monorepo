import Link from 'next/link';
import './result.scss';
import Image from 'next/image';
const SearchResult = (props) => {
  return (
    <Link className="searchResult" to={{ pathname: `/product/${props.id}` }}>
      <Image
        className="searchResult__img"
        src={`/images/products/small/${props.image}`}
        alt={props.name}
        fill
      />
      <p className="searchResult__text">{props.name}</p>
      <p className="searchResult__text searchResult__text--price">
        {props.stocks}
      </p>
    </Link>
  );
};

export default SearchResult;
