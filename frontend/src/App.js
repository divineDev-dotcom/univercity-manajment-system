import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Button from './components/Button';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
return(
<Router>
<div>
<header>
<nav>
<ul>
<li><Link to="/">Home</Link></li>
</ul>
</nav>
</header>
<main>
<h1>Welcome!</h1>
</main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="privacyPolicy" element={<PrivacyPolicy />} />
<Route path="/termsAndConditions" element={<TermsAndConditions />} />
</Routes>
<footer>
<nav>
<ul>
<li><Link to="/privacyPolicy">Privacy Policy</Link></li>
<li><Link to="/termsAndConditions">Terms and Conditions</Link></li>
<p>Copyright 2024</p>
</ul>
</nav>
</footer>
</div>
</Router>
);
}

export default App;