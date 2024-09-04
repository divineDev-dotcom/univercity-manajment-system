import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Button from './components/button';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import TermsCondition from './pages/termscondition';
import PrivacyPolicy from './pages/privacypolicy';

function App() {
return(
<div>
<Router>
<Header />
<Routes>
<Route path="/" element={<Home /> } />
<Route path="/termscondition" element={<TermsCondition /> } />
<Route path="/privacypolicy" element={<PrivacyPolicy /> } />
</Routes>
<Footer />
</Router>
</div>
);
}
export default App;