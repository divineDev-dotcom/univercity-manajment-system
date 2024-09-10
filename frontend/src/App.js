import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home'; 
import Button from './components/button'; 
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import TermsAndConditions from './pages/TermsAndConditions'; // Corrected the import path
import ShootingStar from './ShootingStar.jpg';
import CourseSelection from './CourseSelection.js';
import CoppyWrite from './pages/CoppyWrite'; 

function App() {
return (
<Router>
<div>
<header>
<nav>
<img src={ShootingStar} alt="A blue logo of a Shooting Star, which makes all our wishes come true"style={{ width: '150px', height: '150px' }} 
/>
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/CourseSelection">Course Selection</Link></li>
<li><Link to="/CoppyWrite">CoppyWrite</Link></li>


</ul>
</nav>
</header>
<main>
<h1>Welcome To our University’s WebSite. Here you will find all important information regarding our University</h1>
</main> 
<Routes>
<Route path="/" element={<Home />} />
<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
<Route path="/termsAndConditions" element={<TermsAndConditions />} />
<Route path="/CourseSelection" element={<CourseSelection />} />
<Route path="/CoppyWrite" element={<CoppyWrite />} />
</Routes>
<footer>
<nav>
<ul>
<li><Link to="/privacyPolicy">Privacy Policy</Link></li>
<li><Link to="/termsAndConditions">Terms and Conditions</Link></li> 
</ul>
</nav>
<p>Copyright 2024</p> 
</footer> 
</div> 
</Router> 
);
}

export default App; 
