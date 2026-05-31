import React, { useRef, useEffect, useState } from 'react';
import { navbarStyles } from '../assets/dummyStyles.js';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react';
import { User, X, Menu } from 'lucide-react';
import logo from '../assets/logo.png';

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();
   //Hide  and  show navbar on scroll
   useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
//Sync the doctor login state across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  //close the toggle menu for mobile when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className={navbarStyles.navbarBorder}></div>

      <nav ref={navRef}
        className={`${navbarStyles.navbarContainer} ${
          showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        }`}
      >
        <div className={navbarStyles.contentWrapper}>
          <div className={navbarStyles.flexContainer}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImageWrapper}>
                  <img
                    src={logo}
                    alt="logo"
                    className={navbarStyles.logoImage}
                  />
                </div>
              </div>
              <div className={navbarStyles.logoTextContainer}>
                <h1 className={navbarStyles.logoTitle}>Medicare</h1>
                <p className={navbarStyles.logoSubtitle}>Healthcare Solution</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`${navbarStyles.navItem} ${
                      location.pathname === item.href
                        ? navbarStyles.navItemActive
                        : navbarStyles.navItemInactive
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className={`${navbarStyles.rightSideContainer} flex items-center gap-3`}>
              <SignedOut>
                <Link to='doctor-admin/login' className={navbarStyles.doctorAdminButton}>
                  <User className={navbarStyles.doctorAdminIcon} />
                  <span className={navbarStyles.doctorAdminText}>
                    Doctor Admin
                  </span>
                </Link>
                {/* patient login */}
                <button
                  onClick={() => clerk.openSignIn()}
                  className={navbarStyles.loginButton}>
                  <key className={navbarStyles.loginIcone} />
                  Login
                </button>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={navbarStyles.mobileToggle}>
                {isOpen ? <X className={navbarStyles.mobileToggleIcon} /> :
                  <Menu className={navbarStyles.mobileToggleIcon} />}
              </button>
            </div>

          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className={navbarStyles.mobileMenu}>
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`${navbarStyles.mobileMenuItem} ${
                      isActive
                        ? navbarStyles.mobileMenuItemActive
                        : navbarStyles.mobileMenuItemInactive
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <SignedOut>
                <Link to='doctor-admin/login' className={navbarStyles.mobileDoctorAdminButton}
                onClick={() => setIsOpen(false)}>
                  Doctor admin
                </Link>
             <div className={navbarStyles.mobileLoginContainer}>
              <button onClick={() => {
                setIsOpen(false);
                clerk.openSignIn();
              }}className={navbarStyles.mobileLoginButton}>
                Login
                </button>
             </div>
              </SignedOut>
            </div>
          )}

        </div>
        <style>{navbarStyles.animationStyles}</style>
      </nav>
    </>
  );
};

export default Navbar;