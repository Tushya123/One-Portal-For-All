import React, { useState, useEffect, useContext } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import SignContext from "../../contextAPI/Context/SignContext";
import { Link, useNavigate } from "react-router-dom";
import { date } from "yup";

const ProfileDropdown = () => {

  const time=localStorage.getItem('timestamp');
  const Role=localStorage.getItem('Role');
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { getLoggedInAdmin } = useContext(SignContext);
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState({});

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("authToken");
    navigate("/");
  };

  const getloggedinAdmin = async (token) => {
    const res = await getLoggedInAdmin(token);
    if (res.success) {
      setUserInfo(res);
    } else {
      // console.log(res.msg);
    }
  };

  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken");
    getloggedinAdmin(authToken);
  }, []);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={`${url}/${UserInfo.image}`}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
              {UserInfo.name}<br/>
              {Role}
           <br/>
              {time}
              </span>
              {/* <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span> */}
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {UserInfo.name}!</h6>
          <Link  to="/pages-profile">
          <DropdownItem >
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
          </Link>
          <div className="dropdown-divider"></div>
          {/* <DropdownItem>
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>₹5971.67</b>
            </span>
          </DropdownItem> */}
          <DropdownItem href="/logout">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" onClick={handleLogout} data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
