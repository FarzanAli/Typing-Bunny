import React from 'react';
// import { FontAwesomeIcon } from 'react-icons/fa';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function AccountLoginIcon(props) {
  const location = useLocation();
  const handleAccountLoginClick = () => {
    // Add logic to redirect to account login page
  }

  return (
    <>
      {location.pathname == '/account' || location.pathname == '/login' ?
        <Link to="/">
          <div>
            <FaHome style={{ width: `80%`, height: `80%` }}/>
          </div>
        </Link>
        :
        <div style={{ marginTop: '5px' }} onClick={handleAccountLoginClick}>
          <Link to="/account" className='Link'>
            <FaUserCircle style={{ width: `80%`, height: `80%` }} />
          </Link>
        </div>
      }
    </>
  );
}

export default AccountLoginIcon;
