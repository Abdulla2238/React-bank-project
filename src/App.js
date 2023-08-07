
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import Dash from './pages/Dash';
import Report from './pages/Report';
import Request from './pages/Request';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
            <Route path='/'element={<Layout/>}>
            <Route index  element={<Dash/>}/>
            <Route path='/rep'element={<Report/>}/>
            <Route path='/req'element={<Request/>}/>
           


            </Route>

            
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
