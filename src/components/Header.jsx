import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X, Phone, User, LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <span className="logo-sino">SINO</span>
          <span className="logo-at">@</span>
          <span className="logo-ts">THUNGSONG</span>
        </Link>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            หน้าแรก
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            ห้องพัก
          </NavLink>
          <NavLink to="/facilities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            สิ่งอำนวยความสะดวก
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            แกลเลอรี
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            เกี่ยวกับเรา
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            บทความ
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            ติดต่อเรา
          </NavLink>
        </nav>

        <div className="header-cta">
          <a href="tel:0887572195" className="btn btn-primary btn-phone">
            <Phone size={14} style={{ marginRight: '6px' }} />
            <span>088-757-2195</span>
          </a>

          {currentUser ? (
            <div className="admin-status-nav">
              <Link to="/admin" className="btn btn-outline btn-sm admin-btn">
                <User size={14} style={{ marginRight: '4px' }} />
                <span>ควบคุม</span>
              </Link>
              <button onClick={handleLogout} className="logout-icon-btn" title="ออกจากระบบ">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm admin-btn" title="ระบบหลังบ้าน">
              <User size={14} />
            </Link>
          )}

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
