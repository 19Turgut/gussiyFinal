import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { store } from './App/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Carts from './components/Carts';
import Modal from './components/Modal';
import About from './components/About';
import { useEffect } from 'react';
import { calculateTotals } from './features/cartSlice';
import SingleProduct from './components/SingleProduct';

function App() {

  const {cartItems} = useSelector((store) => store.cart);
  const {message} = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateTotals());  
  }, [cartItems])

  const {isOpen} = useSelector((store) => store.modal);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        {isOpen && <Modal message={message}/>}
        <Routes>
          <Route path='/shop' element={<Home/>} />
          <Route path="/shop/cart" element={<Carts/>}/>
          <Route path="/shop/about" element={<About/>}/>
          <Route path="/shop/product/:id" element={<SingleProduct/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
