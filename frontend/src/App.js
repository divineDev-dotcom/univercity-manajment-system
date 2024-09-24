import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/routes';
import * as Component from './components/barrel';
import ShootingStar from './ShootingStar.jpg'; // Import the logo

function App() {
  return (
    <Router>
      <div>
{/*
<div style={{ textAlign: 'center', margin: '20px 0' }}>
<img src={ShootingStar} alt="Blue Shooting Star logo representing a shooting star that symbolizes making wishes come true." style={{ width: '150px', height: 'auto' }} // Adjust size as needed
          />
</div>
*/}
        <Component.Header />
<AppRoutes />
        <Component.Footer />
      </div>
    </Router>
  );
}

export default App;