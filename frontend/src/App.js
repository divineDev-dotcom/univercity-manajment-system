import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/routes';
import * as Component from './components/barrel';

function App() {
return(
<Router>
<div>
<Component.Header />
<AppRoutes />
<Component.Footer />
</div>
</Router>
);
}
export default App;