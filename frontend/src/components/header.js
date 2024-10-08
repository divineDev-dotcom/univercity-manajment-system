import { Link } from 'react-router-dom';
import { Menu, Collapsible  } from './barrel';

const Header = () => {
  const accountMenuItems = [
    { label: "Privacy policy", link: "/privacypolicy" }
  ];

  return (
    <div>
      <header>
<Collapsible title="section one">
<p> hi I am collapsible </p>
</Collapsible>
         <Menu title="Account Manager" items={accountMenuItems} />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/studentadmission">Apply for admissions</Link></li>
          </ul> 
        </nav> 
      </header> 
    </div>
  );
};

export default Header;
