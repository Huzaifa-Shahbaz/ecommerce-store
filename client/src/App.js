import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'swiper/css';
import './global/Styles/style1.css';
import './global/Styles/responsive.css'
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminRoutes from './components/admin';




function App() {

  const [adminRoute, setAdminRoute] = useState(false);


  useEffect(()=> {
    const location = window.location.pathname;
    if(location === '/admin') {
      setAdminRoute(true)
    } else {
      setAdminRoute(false)
    }
  }, [])

  
  return (
    <div className="App">
      <BrowserRouter>
        {adminRoute === true ?
          <AdminRoutes />
          :
          <Main />
        }        
      </BrowserRouter>
    </div>
  );
}

export default App;
