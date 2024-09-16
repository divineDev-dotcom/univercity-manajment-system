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
&copy; //line to be edited
</footer>
</div>
);
}
export default Footer;