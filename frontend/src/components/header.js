import {Link} from 'react-router-dom';

const Header = () => {
return(
<div>
<header>
<nav>
<ul>
<li>
<Link to="/"> Home </Link>
</li>
</ul>
</nav>
</header>
</div>
);
}
export default Header;