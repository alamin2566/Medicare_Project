import React, { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react'
import { navbarStyles as ns } from '../assets/dummyStyles'
import logoImg from '../assets/logo.png'
import {
  Link,
  useLocation,
  useNavigate,
  NavLink
} from 'react-router-dom'

import { useClerk, useAuth, useUser } from '@clerk/clerk-react';

import {
  Home,
  UserPlus,
  Users,
  Calendar,
  Grid,
  PlusSquare,
  List,
  Menu,
  X
} from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navInnerRef = useRef(null)
  const indicatorRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const clerk = useClerk();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();

  const moveIndicator = useCallback(() => {
    const container = navInnerRef.current;
    const ind = indicatorRef.current;
    if (!container || !ind) return;

    const active = container.querySelector(".nav-item.active");
    if (!active) {
      ind.style.opacity = "0";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const left = activeRect.left - containerRect.left + container.scrollLeft;
    const width = activeRect.width;

    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
    ind.style.opacity = "1";
  }, []);

  useLayoutEffect(() => {
    moveIndicator();
    const t = setTimeout(() => {
      moveIndicator();
    }, 120);
    return () => clearTimeout(t);
  }, [location.pathname, moveIndicator]);

  useEffect(() => {
    const container = navInnerRef.current;
    if (!container) return;

    const onScroll = () => {
      moveIndicator();
    };
    container.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      moveIndicator();
    });
    ro.observe(container);
    if (container.parentElement) ro.observe(container.parentElement);

    window.addEventListener("resize", moveIndicator);

    moveIndicator();

    return () => {
      container.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let mounted = true;

    const storeToken = async () => {
      if (!authLoaded || !userLoaded) return;

      if (!isSignedIn) {
        try {
          localStorage.removeItem("Clerk_token");
        } catch (e) {
          // token removed
        }
        return;
      }

      try {
        if (getToken) {
          const token = await getToken();

          if (!mounted) return;

          if (token) {
            try {
              localStorage.setItem("Clerk_token", token);
            } catch (e) {
              console.warn("Failed to write clerk token in localstorage", e);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to write clerk token in localstorage", err);
      }
    };

    storeToken();

    return () => {
      mounted = false;
    };
  }, [authLoaded, userLoaded, isSignedIn, getToken]);

  const handleOpenSignIn = () => {
    if (!clerk || !clerk.openSignIn) {
      console.warn("Clerk is not initialized");
      return;
    }
    clerk.openSignIn();
    navigate("/");
  };

  const handleSignOut = async () => {
    if (!clerk || !clerk.signOut) {
      console.warn("Clerk is not initialized");
      return;
    }

    try {
      await clerk.signOut();
    } catch (err) {
      console.error("Sign out Failed", err);
    } finally {
      try {
        localStorage.removeItem("Clerk_token");
      } catch (e) {
        // ignore
      }
      navigate("/");
    }
  };

  return (
    <header className={ns.header}>
      <nav className={ns.navbarContainer}>
        <div className={ns.flexContainer}>

          <div className={ns.logoContainer}>
            <img
              src={logoImg}
              alt="logo"
              className={ns.logoImage}
            />

            <Link to='/'>
              <div className={ns.logoLink}>
                Medicare
              </div>

              <div className={ns.logoSubtitle}>
                Healthcare Solutions
              </div>
            </Link>
          </div>

          <div className={ns.centerNavContainer}>
            <div className={ns.glowEffrect}>
              <div className={ns.centerNavINNER}>
                <div
                  ref={navInnerRef}
                  tabIndex={0}
                  className={ns.centerNavScrollContainer}
                  style={{
                    WebkitOverflowScrolling: "touch",
                    display: "flex",
                    alignItems: "stretch",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollbarWidth: "none"
                  }}
                >
                  <CenterNavItem to="/h" label="Dashboard" icon={<Home size={18} />} />
                  <CenterNavItem to="/add" label="Add Doctor" icon={<UserPlus size={18} />} />
                  <CenterNavItem to="/list" label="List Doctors" icon={<Users size={18} />} />
                  <CenterNavItem to="/appointments" label="Appointments" icon={<Calendar size={18} />} />
                  <CenterNavItem to="/service-dashboard" label="Service Dashboard" icon={<Grid size={18} />} />
                  <CenterNavItem to="/add-service" label="Add Service" icon={<PlusSquare size={18} />} />
                  <CenterNavItem to="/list-service" label="List Services" icon={<List size={18} />} />
                  <CenterNavItem to="/service-appointments" label="Service Appointments" icon={<Calendar size={18} />} />
                </div>
              </div>
            </div>
          </div>

          <div className={ns.rightContainer}>
            {isSignedIn ? (
              <button onClick={handleSignOut} className={ns.signOutButton + " " + ns.cursorPointer}>
                Sign Out
              </button>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <button onClick={handleOpenSignIn} className={ns.signInButton + " " + ns.cursorPointer}>
                  Login
                </button>
              </div>
            )}
            {/*  mobile toggle*/}
            <button onClick={() => setOpen((v) => !v)} className={ns.mobileMenuButton}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
        {/* Mobile Navigation */}
        {open && (
          <div className={ns.mobileOverlay} onClick={() => setOpen(false)} />
        )}

        {open && (
          <div className={ns.mobileNavContainer} id="mobile-menu">
            <div className={ns.mobileMenuInner}>
              <MobileItem
                to="/h"
                label="Dashboard"
                icon={<Home size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/add"
                label="Add Doctor"
                icon={<UserPlus size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list"
                label="List Doctors"
                icon={<Users size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/appointments"
                label="Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/service-dashboard"
                label="Service Dashboard"
                icon={<Grid size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/add-service"
                label="Add Service"
                icon={<PlusSquare size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/list-service"
                label="List Services"
                icon={<List size={16} />}
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/service-appointments"
                label="Service Appointments"
                icon={<Calendar size={16} />}
                onClick={() => setOpen(false)}
              />

              <div className={ns.mobileAuthContainer}>
                {isSignedIn ? (
                  <button onClick={() => {
                    setOpen(false);
                    handleSignOut();
                  }} className={ns.mobileSingOutButton}>
                    Sign Out
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button onClick={() => {
                      setOpen(false);
                      handleOpenSignIn();
                    }} className={ns.mobileLoginButton + " " + ns.cursorPointer}>
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </nav>
    </header>
  )
}

export default Navbar

function CenterNavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `nav-item ${isActive ? "active" : ""} ${ns.centerNavItemBase} ${isActive ? ns.centerNavItemActive : ns.centerNavItemInactive}`
      }
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0
      }}
    >
      <span>{icon}</span>
      <span style={{ fontSize: "11px" }}>{label}</span>
    </NavLink>
  );
}


function MobileItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${ns.mobileItemBase} ${
          isActive ? ns.mobileItemActive : ns.mobileItemInactive
        }`
      }
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
}