import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateCommponent from './components/PrivateComponent';  
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <div className='main-content'>
      <Routes>
        
        <Route element={<PrivateCommponent />}>
        <Route path="/" element={<ProductList />}/>
        <Route path="/add" element={<AddProduct />}/>
        <Route path="/update/:id" element={<UpdateProduct />}/>
        <Route path="/logout" element={<h1>Logout component</h1>}/>
        <Route path="/profile" element={<Profile />}/>
        </Route>

        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </div>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
