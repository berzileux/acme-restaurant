import { useEffect } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LocationPage from './pages/LocationPage';
import SchemaPage from './pages/SchemaPage';
import { brand } from './content/brand';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Braces matter: newer Chrome returns a Promise from scrollTo, and an effect must not return one.
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        className="skip-link"
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Skip to content
      </a>
      <ScrollToTop />
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark" aria-hidden="true">A</span>
            <span>{brand.name}</span>
          </Link>
          <nav aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/schema">How it works</NavLink>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
          <Route path="/schema" element={<SchemaPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>{brand.name} is a fictional brand. This site is a portfolio demo of a franchise web ecosystem: shared brand content with local overrides.</p>
        </div>
      </footer>
    </>
  );
}