
import './App.css';

import Homepage from './Pages/Homepage';
import {Route,Routes,BrowserRouter } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Loginpage from './Pages/Loginpage';
import Staffdash from './Pages/Staffdash';
import Homewithlink from './Pages/Homewithlink';
import Bylink from './Pages/Bylink';
import Successpage from './Pages/Successpage';
import Failed from './Pages/Failed';


function App() {
  return (
    <div>
<BrowserRouter>
  <Routes>
  <Route path='/Spage' element={<Successpage/>}/>
  <Route path='/Fpage' element={<Failed/>}/>
    <Route path='/Home' element={<Homepage/>} />
    <Route path='/GuestHome/:LinkID' element={<Homewithlink/>} />
    <Route path='/Dashboard' element={<Dashboard/>} />
    <Route path='/Login' element={<Loginpage/>} />
    <Route   path='/' element={<Loginpage/>} />
    <Route path='/Staffdash' element={<Staffdash/>} />
    <Route path='/Bylinkdash' element={<Bylink/>} />
  </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
