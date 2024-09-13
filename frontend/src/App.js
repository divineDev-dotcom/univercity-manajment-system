import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home'; 
import Button from './components/button'; 
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import TermsAndConditions from './pages/TermsAndConditions'; // Corrected the import path
import ShootingStar from './ShootingStar.jpg';
import CourseSelection from './CourseSelection.js';
import CopyWrite from './pages/CopyWrite'; 

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
<Route path="/CopyWrite" element={<CopyWrite />} />
</Routes>
<footer>
<nav>
<ul>
<li><Link to="/privacyPolicy">Privacy Policy</Link></li>
<li><Link to="/termsAndConditions">Terms and Conditions</Link></li> 
<li><Link to="/CopyWrite">CoppyWrite</Link></li>
</ul>
</nav>
<p>Copyright 2024</p> 
</footer> 
</div> 
</Router> 
);
}

export default App; 
