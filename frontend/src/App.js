import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/routes';
import * as Component from './components/barrel';
import ShootingStar from './ShootingStar.jpg';
import { AdmissionProvider } from './context/admissionContext';

function App() {
  return (
    <AdmissionProvider>
      <Router>
        <img src={ShootingStar} alt="Blue Shooting Star logo" style={{ width: '150px', height: 'auto' }} />

        <div>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
          </div>
          <Component.Header />
          <AppRoutes />
          <Component.Footer />
        </div>
      </Router>
    </AdmissionProvider>
  );
}

export default App;
