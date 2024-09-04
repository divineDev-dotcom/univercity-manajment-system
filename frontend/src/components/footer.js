import {Link} from 'react-router-dom';

function Footer() {
return(
<div>
<footer>
<ul>
<li>
<Link to="/termscondition"> Terms and Conditions </Link>
</li>

<li>
<Link to="/privacypolicy"> Privacy Policy </Link>
</li>
</ul>
&copy; 2024 
</footer>
</div>
);
}
export default Footer;