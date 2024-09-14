import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import { Roles } from "../../pages/Authentication/Login";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiFillAppstore } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
// Import Data
import navdata from "../LayoutMenuData";
import "./style2.css";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";
// const userRole = localStorage.getItem('Rights');
console.log(typeof Roles);

const VerticalLayout = (props) => {

  const handleDropdownToggle = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    setLocationSetup(!locationSetup);
  };

  const handleItemClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
  };
  // console.log("This Is Roles", Roles);
  // console.log("niceee", Roles);

  let isAdmin = false;
  if (Roles === "Admin") {
    isAdmin = true;
  }
  console.log(isAdmin);
  const [locationSetup, setLocationSetup] = useState(false);
  const [setup, setsetup] = useState(false);
  const [product, setproduct] = useState(false);
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [reports, setreports] = useState(false);
  const [mediaManage, setMediaManage] = useState(false);

  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      console.log("This is",matchingMenuItem)
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      <li className="nav-item " style={{visibility:"hidden",height:"0px"}}>
      
      <Link
        className="border-custom ps-2 nav-link menu-link "
        to="#"
        data-bs-toggle="collapse"
        onClick={() => {
          setLocationSetup(!locationSetup);
          console.log("hii",!locationSetup)
        }}
       
      >
       <AiFillAppstore />
        <span data-key="t-apps">
           <span className="abc1111">  Setup{" "} </span>
        </span>
      </Link>
      {console.log("Byeee",locationSetup)}
      <Collapse
        className="menu-dropdown"
        isOpen={locationSetup}
      >
        <ul className="border-0 nav nav-sm flex-column test">
          {/* <li className="border-0 nav-item">
            <Link to="/menumaster" className="nav-link" >
              <span className="abc1111">Menu Master{" "}</span>
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/roles-responsibilty" className="nav-link" >
            <span className="abc1111">Roles & Responsibility</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/template" className="nav-link">
            <span className="abc1111">Template</span>
            </Link>
          </li> */}
            <li className="nav-item">
              <Link to="/TaskTemplateMaster" className="nav-link">
                <span className="abc1111">Tools Template</span>
              </Link>
            </li>

          {!isAdmin ? (
            <li className="nav-item">
              <Link to="/admin-user" className="nav-link" >
              <span className="abc1111">Admin User</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </Collapse>
    </li>

      <li className="nav-item ">
        <Link className="border-custom ps-2 nav-link menu-link abc1111" to="/dashboard">
          <span data-key="t-apps">
            {" "}
            <AiOutlineDashboard className="fs-4" /><span className="abc1111">  Dashboard{" "}</span>
          </span>
        </Link>
      </li>
      <li className="nav-item ">
        <Link
          className="border-custom ps-2 nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setproduct(!product);
          }}
        > <RiAccountCircleLine />
          <span data-key="t-apps ">
            <span className="abc1111"> Department Master</span>{" "}
          </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
        //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="new-nav nav-item">
              <Link to="/department-group" className="nav-link">
                <span className="abc1111"> Type of Functions</span>
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/department-type" className="nav-link">
                <span className="abc1111">Department Type</span>
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/employee-roles" className="nav-link">
                <span className="abc1111">Employee Role</span>
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/employee-master" className="nav-link">
                <span className="abc1111">Employee Master</span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
     
      <li className="nav-item ">
        <Link
          className="border-custom ps-2 nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            {console.log("Noo",!setup)}
            setsetup(!setup);
          }}
        >  <AiFillAppstore />
          <span data-key="t-apps">
            <span className="abc1111">Setup</span>
          </span>
        </Link>
        {console.log("Neww",setup)}
        <Collapse
        className="menu-dropdown"
        isOpen={setup}
      >
        <ul className="border-0 nav nav-sm flex-column test">
          {/* <li className="border-0 nav-item">
            <Link to="/menumaster" className="nav-link" >
              <span className="abc1111">Menu Master{" "}</span>
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/roles-responsibilty" className="nav-link" >
            <span className="abc1111">Roles & Responsibility</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/template" className="nav-link">
            <span className="abc1111">Template</span>
            </Link>
          </li> */}
            <li className="nav-item">
              <Link to="/TaskTemplateMaster" className="nav-link">
                <span className="abc1111">Tools Template</span>
              </Link>
            </li>
          {!isAdmin ? (
            <li className="nav-item">
              <Link to="/admin-user" className="nav-link" >
              <span className="abc1111">Admin User</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </Collapse>
      </li>
      <li className="nav-item ">
        <Link
          className="border-custom ps-2 nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setSubs(!subs);
          }}
        >  <IoFileTrayFullOutline />
          <span data-key="t-apps">

            <span className="abc1111"> Tools Master{" "}</span>
          </span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={subs}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/add-taskmaster" className="nav-link">
                <span className="abc1111">Add Tools</span>
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/assign-master" className="nav-link">
                <span className="abc1111">Assign Tools</span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item ">
        <Link
          className="border-custom ps-2 nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            {console.log("Noo",!category)}
            setCategory(!category);
          }}
        ><RiPagesLine />
          <span data-key="t-apps">
            <span className="abc1111">  Master</span>
          </span>
        </Link>
        {console.log("Neww",category)}
        <Collapse className="menu-dropdown" isOpen={category}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="ps-2 nav-link menu-link" to="/community-update">
                <span data-key="t-apps" className="abc1111"> Community Update Master </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="ps-2 nav-link menu-link" to="/location-master">
                <span data-key="t-apps" className="abc1111">Location Master</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="ps-2 nav-link menu-link" to="/admin-user">
                <span data-key="t-apps" className="abc1111">New Master</span>
              </Link>
            </li> */}
          </ul>
        </Collapse>
      </li>
      

      

      {/* <li className="nav-item ">
        <Link className="border-custom ps-2 nav-link menu-link" to="/dashboard">
        <FaPencilAlt />
          <span data-key="t-apps">
           
            <span className="abc1111">  CMS{" "}</span>
          </span>
        </Link>
      </li> */}
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
// import React, { useEffect } from 'react';
// import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
// import { Collapse } from 'reactstrap';

// // Import Data
// import navdata from "../LayoutMenuData";
// //i18n
// import { withTranslation } from "react-i18next";
// import withRouter from '../../Components/Common/withRouter';

// const VerticalLayout = (props) => {
//     const navData = navdata().props.children;
//     console.log(navData)
//     const path = props.router.location.pathname;
//     console.log(path);

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         const initMenu = () => {
//             const pathName = process.env.REACT_APP_BASE_URL + path;
//             console.log(pathName)
//             const ul = document.getElementById("navbar-nav");
//             const items = ul.getElementsByTagName("a");
            
//             let itemsArray = [...items]; // converts NodeList to Array
//             console.log(itemsArray);
//             removeActivation(itemsArray);
//             let matchingMenuItem = itemsArray.find((x) => {
//                 return x.pathname === pathName;
//             });
            
//             console.log(matchingMenuItem)
//             if (matchingMenuItem) {
//                 activateParentDropdown(matchingMenuItem);
//             }
//         };
//         if (props.layoutType === "vertical") {
//             initMenu();
//         }
//     }, [path, props.layoutType]);

//     function activateParentDropdown(item) {
//         item.classList.add("active");
//         let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

//         if (parentCollapseDiv) {
//             // to set aria expand true remaining
//             parentCollapseDiv.classList.add("show");
//             parentCollapseDiv.parentElement.children[0].classList.add("active");
//             parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
//             if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
//                 parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
//                 if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
//                     parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
//                 if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
//                     parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
//                     parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
//                 }
//             }
//             return false;
//         }
//         return false;
//     }

//     const removeActivation = (items) => {
//         let actiItems = items.filter((x) => x.classList.contains("active"));

//         actiItems.forEach((item) => {
//             if (item.classList.contains("menu-link")) {
//                 if (!item.classList.contains("active")) {
//                     item.setAttribute("aria-expanded", false);
//                 }
//                 if (item.nextElementSibling) {
//                     item.nextElementSibling.classList.remove("show");
//                 }
//             }
//             if (item.classList.contains("nav-link")) {
//                 if (item.nextElementSibling) {
//                     item.nextElementSibling.classList.remove("show");
//                 }
//                 item.setAttribute("aria-expanded", false);
//             }
//             item.classList.remove("active");
//         });
//     };

//     return (
//         <React.Fragment>
//             {/* menu Items */}
//             {(navData || []).map((item, key) => {
//                 return (
//                     <React.Fragment key={key}>
//                         {/* Main Header */}
//                         {item['isHeader'] ?
//                             <li className="menu-title"><span data-key="t-menu">{props.t(item.label)} </span></li>
//                             : (
//                                 (item.subItems ? (
//                                     <li className="nav-item">
//                                         <Link
//                                             onClick={item.click}
//                                             className="nav-link menu-link"
//                                             to={item.link ? item.link : "/#"}
//                                             data-bs-toggle="collapse"
//                                         >
//                                             <i className={item.icon}></i>
//                                             <span data-key="t-apps">{props.t(item.label)}</span>
//                                             {item.badgeName ?
//                                                 <span className={"badge badge-pill bg-" + item.badgeColor} data-key="t-new">{item.badgeName}</span>
//                                             : null}
//                                         </Link>
//                                         <Collapse
//                                             className="menu-dropdown"
//                                             isOpen={item.stateVariables}
//                                             id="sidebarApps">
//                                             <ul className="nav nav-sm flex-column test">
//                                                 {/* subItms  */}
//                                                 {item.subItems && ((item.subItems || []).map((subItem, key) => (
//                                                     <React.Fragment key={key}>
//                                                         {!subItem.isChildItem ? (
//                                                             <li className="nav-item">
//                                                                 <Link
//                                                                     to={subItem.link ? subItem.link : "/#"}
//                                                                     className="nav-link"
//                                                                 >
//                                                                     {props.t(subItem.label)}
//                                                                     {subItem.badgeName ?
//                                                                         <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
//                                                                         : null}
//                                                                 </Link>
//                                                             </li>
//                                                         ) : (
//                                                             <li className="nav-item">
//                                                                 <Link
//                                                                     onClick={subItem.click}
//                                                                     className="nav-link"
//                                                                     to="/#"
//                                                                     data-bs-toggle="collapse"
//                                                                 > 
//                                                                 {props.t(subItem.label)}
//                                                                 {subItem.badgeName ?
//                                                                     <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
//                                                                 : null}
//                                                                 </Link>
//                                                                 <Collapse className="menu-dropdown" isOpen={subItem.stateVariables} id="sidebarEcommerce">
//                                                                     <ul className="nav nav-sm flex-column">
//                                                                         {/* child subItms  */}
//                                                                         {subItem.childItems && (
//                                                                             (subItem.childItems || []).map((childItem, key) => (
//                                                                                 <React.Fragment key={key}>
//                                                                                     {!childItem.childItems ?
//                                                                                         <li className="nav-item">
//                                                                                             <Link
//                                                                                                 to={childItem.link ? childItem.link : "/#"}
//                                                                                                 className="nav-link">
//                                                                                                 {props.t(childItem.label)}
//                                                                                             </Link>
//                                                                                         </li>
//                                                                                         : <li className="nav-item">
//                                                                                             <Link to="/#" className="nav-link" onClick={childItem.click} data-bs-toggle="collapse">
//                                                                                                 {props.t(childItem.label)}
//                                                                                             </Link>
//                                                                                             <Collapse className="menu-dropdown" isOpen={childItem.stateVariables} id="sidebaremailTemplates">
//                                                                                                 <ul className="nav nav-sm flex-column">
//                                                                                                 {console.log("Hii",childItem.childItems)}
//                                                                                                     {childItem.childItems.map((subChildItem, key) => (
//                                                                                                         <li className="nav-item" key={key}>
//                                                                                                             <Link to={subChildItem.link} className="nav-link" data-key="t-basic-action">{props.t(subChildItem.label)} </Link>
//                                                                                                         </li>
//                                                                                                     ))}
//                                                                                                 </ul>
//                                                                                             </Collapse>
//                                                                                         </li>
//                                                                                     }
//                                                                                 </React.Fragment>
//                                                                             ))
//                                                                         )}
//                                                                     </ul>
//                                                                 </Collapse>
//                                                             </li>
//                                                         )}
//                                                     </React.Fragment>
//                                                 ))
//                                                 )}
//                                             </ul>

//                                         </Collapse>
//                                     </li>
//                                 ) : (
//                                     <li className="nav-item">
//                                         <Link
//                                             className="nav-link menu-link"
//                                             to={item.link ? item.link : "/#"}>
//                                             <i className={item.icon}></i> <span>{props.t(item.label)}</span>
//                                             {item.badgeName ?
//                                                 <span className={"badge badge-pill bg-" + item.badgeColor} data-key="t-new">{item.badgeName}</span>
//                                                 : null}
//                                         </Link>
//                                     </li>
//                                 ))
//                             )
//                         }
//                     </React.Fragment>
//                 );
//             })}
//         </React.Fragment>
//     );
// };

// VerticalLayout.propTypes = {
//     location: PropTypes.object,
//     t: PropTypes.any,
// };

// export default withRouter(withTranslation()(VerticalLayout));