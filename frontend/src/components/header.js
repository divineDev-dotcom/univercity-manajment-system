import { Link } from 'react-router-dom';
import { Menu } from './barrel';

const Header = () => {
  const accountMenuItems = [
    { label: "Privacy policy", link: "/privacypolicy" }
  ];

  return (
    <div>
      <header>
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
