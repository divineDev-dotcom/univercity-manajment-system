import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import PrivacyPolicy from '../pages/privacypolicy';
import TermsAndCondition from '../pages/termscondition';
import StudentDetails from './studentDetails';

const AppRoutes = () => {
return(
<Routes>
<Route path="/" element={ <Home /> } exact />
<Route path="/privacypolicy" element={ <PrivacyPolicy /> } />
<Route path="/termscondition" element={ <TermsAndCondition /> } />
<Route path="/studentdashboard" element={ <studentdashboard /> } />
<Route path="/studentadmission" element={<StudentDetails /> } />
</Routes>

);
};

export default AppRoutes;