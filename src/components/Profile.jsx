import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('https://stevek3008.pythonanywhere.com/api/logout', {
        user_id: user?.user_id,
      });
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }

    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <StyledWrapper className="container mt-5 d-flex flex-column align-items-center">
      <div
        aria-label="User Profile Card"
        tabIndex={0}
        role="button"
        className="user-profile"
      >
        <div className="user-profile-inner">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2" id="Layer_2">
              <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
            </g>
          </svg>
          <div>
            <p><strong>{user?.name}</strong></p>
            <p style={{ fontSize: '0.85rem', marginBottom: '5px' }}>{user?.email}</p>
            <button onClick={handleLogout} className="logout-btn">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .user-profile {
    width: 300px;
    min-height: 120px;
    border-radius: 15px;
    cursor: default;
    transition: 0.3s ease;
    background: linear-gradient(
      to bottom right,
      #2e8eff 0%,
      rgba(46, 142, 255, 0) 30%
    );
    background-color: rgba(46, 142, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .user-profile-inner {
    border-radius: 13px;
    background-color: #1a1a1a;
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    width: 100%;
  }

  .user-profile-inner svg {
    width: 40px;
    height: 40px;
    fill: #fff;
  }

  .logout-btn {
    margin-top: 8px;
    background-color: #ff4d4f;
    border: none;
    padding: 6px 12px;
    color: white;
    font-size: 0.85rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .logout-btn:hover {
    background-color: #e04143;
  }
`;

export default Profile;
