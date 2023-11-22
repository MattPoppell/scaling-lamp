
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './header.css'; 

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
            <h1 className="app-title">BandStage Finder</h1>
          </Link>
          <p className="app-description">
          BandStageFinder is your go-to platform for discovering ideal venues to showcase your music. Designed for musicians and bands, this app simplifies the hunt for performance spaces. Explore myriad venues across locations, filter by capacity, preferred genres, amenities like catering or nearby bars, and more. Seamlessly plan your gigs, expand your reach, and elevate your performances with BandStageFinder.
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
              <Link className="btn" to="/">
                Go Back
              </Link>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">
                Login
              </Link>
              <Link className="btn" to="/signup">
                Signup
              </Link>
              <Link className="btn" to="/">
                Go Back
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
