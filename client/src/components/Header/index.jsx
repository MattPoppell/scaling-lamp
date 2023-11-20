
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Header.css'; 

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="header-left">
          <Link className="logo-link" to="/">
            <h1 className="app-title">Tour Finder</h1>
          </Link>
          <p className="app-description">
            The ultimate tour finder app for bands to discover the perfect venues.
          </p>
        </div>
        <div className="header-right">
          {Auth.loggedIn() ? (
            <>
              <Link className="btn" to="/me">
                Profile
              </Link>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">
                Login
              </Link>
              <Link className="btn" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
