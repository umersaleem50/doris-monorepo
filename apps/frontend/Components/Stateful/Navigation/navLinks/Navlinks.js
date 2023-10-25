import Link from 'next/link';

const navlinks = (props) => {
  return (
    <ul>
      {props.links.map((el, i) => (
        <li key={i}>
          <Link
            href={`/products/${el.split(' ').join('-')}`}
            className="nav__link"
            onMouseEnter={props.closeContainer}
            onMouseLeave={props.showContainer}
          >
            {el}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default navlinks;
