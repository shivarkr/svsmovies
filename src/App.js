import 'swiper/css'; // Core Swiper styles
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppRoutes from './config/AppRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
