import Link from 'next/link';
import './Logo.scss';

const Logo = (props) => {
  return (
    <Link href="/" className="logo">
      <h6 className="logo__text">
        <span>l</span>oomi
      </h6>
    </Link>
  );
};

export default Logo;
