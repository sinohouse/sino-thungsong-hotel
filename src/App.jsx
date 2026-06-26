import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Client layouts & pages
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import FloatingContact from './components/FloatingContact';
import Home from './pages/frontend/Home';
import Rooms from './pages/frontend/Rooms';
import RoomDetail from './pages/frontend/RoomDetail';
import Facilities from './pages/frontend/Facilities';
import Gallery from './pages/frontend/Gallery';
import About from './pages/frontend/About';
import Blog from './pages/frontend/Blog';
import Contact from './pages/frontend/Contact';
import Booking from './pages/frontend/Booking';

// Admin layouts & pages
import Login from './pages/backend/Login';
import Dashboard from './pages/backend/Dashboard';
import BookingAdmin from './pages/backend/BookingAdmin';
import RoomAdmin from './pages/backend/RoomAdmin';
import PromoAdmin from './pages/backend/PromoAdmin';
import UserAdmin from './pages/backend/UserAdmin';

// Wrapper component to selectively show/hide Client Header and Footer
function NavigationWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CookieBanner />}
      {!isAdminRoute && <FloatingContact />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <NavigationWrapper>
          <Routes>
            {/* Frontend Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />

            {/* Backend Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<BookingAdmin />} />
            <Route path="/admin/rooms" element={<RoomAdmin />} />
            <Route path="/admin/promotions" element={<PromoAdmin />} />
            <Route path="/admin/users" element={<UserAdmin />} />
          </Routes>
        </NavigationWrapper>
      </Router>
    </AppProvider>
  );
}

export default App;
