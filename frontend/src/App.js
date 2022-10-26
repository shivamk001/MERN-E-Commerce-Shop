import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Loginscreen from './screens/LoginScreen'
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from './screens/ProductListScreen'
import OrderListScreen from "./screens/OrderListScreen";
import {Container} from 'react-bootstrap'

function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3">
    <Container>
    <Routes>

        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<Loginscreen/>}/>
        <Route path='/profile' element={<ProfileScreen />}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} exact/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} exact/>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart/:id' element={<CartScreen />} />
        <Route path='/cart/' element={<CartScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/page/:pageNumber' element={<HomeScreen />} />
        <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />}/>
        <Route path='/search/:keyword' element={<HomeScreen />} exact />
        

        
    </Routes>
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
