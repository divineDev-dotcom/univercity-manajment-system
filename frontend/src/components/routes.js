import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import PrivacyPolicy from '../pages/privacypolicy';
import TermsAndCondition from '../pages/termscondition';


const AppRoutes = () => {
return(
<Routes>
<Route path="/" element={ <Home /> } exact />
<Route path="/privacypolicy" element={ <PrivacyPolicy /> } />
<Route path="/termscondition" element={ <TermsAndCondition /> } />
<Route path="/studentdashboard" element={ <studentdashboard /> } />

</Routes>

);
};

export default AppRoutes;