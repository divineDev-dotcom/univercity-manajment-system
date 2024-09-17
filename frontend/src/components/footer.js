import { Link } from 'react-router-dom';

const Footer = () => {
return(
<div>
<footer>
<ul>
<li>
<Link to="/privacypolicy"> Privacy Policy </Link>
</li>
<li>
<Link to="/termscondition"> Terms and Condition </Link>
</li>
</ul>
<p> 
copy write 2024 @ ShootingStar univercity 
</p>
</footer>
</div>
);
}
export default Footer;