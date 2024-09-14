import React from "react";
import { SignState } from "../contextAPI/State/SignState";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

// Project
import ProjectList from "../pages/Projects/ProjectList";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import CreateProject from "../pages/Projects/CreateProject";

// //Ecommerce Pages
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
//pages
import Starter from "../pages/Pages/Starter/Starter";
import SimplePage from "../pages/Pages/Profile/SimplePage/SimplePage";
import Settings from "../pages/Pages/Profile/Settings/Settings";
import Timeline from "../pages/Pages/Timeline/Timeline";
import Faqs from "../pages/Pages/Faqs/Faqs";
import Pricing from "../pages/Pages/Pricing/Pricing";
import Gallery from "../pages/Pages/Gallery/Gallery";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
import SiteMap from "../pages/Pages/SiteMap/SiteMap";
import SearchResults from "../pages/Pages/SearchResults/SearchResults";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import NewTeam from "../pages/Pages/Team/NewTeam";
import Template from "../pages/MenuMaster/Template";
import EditTemplate from "../pages/MenuMaster/EditTemplate";
// import NewCutomer from "../pages/Ecommerce/EcommerceCustomers/NewCutomer";
// import NewCustomer from "../pages/Ecommerce/EcommerceCustomers/NewCustomer";
// import Content from "../pages/ContentManagement/Content";
// import AddContent from "../pages/ContentManagement/AddContent";
// import EditContent from "../pages/ContentManagement/EditContent";
// import ManageGallery from "../pages/GalleryManagement/ManageGallery";
// import ManageGalleryCat from "../pages/GalleryManagement/ManageGalleryCat";
// import AddGalleryCat from "../pages/GalleryManagement/AddGalleryCat";
// import EditGalleryCat from "../pages/GalleryManagement/EditGalleryCat";
// import AddGalleryDetails from "../pages/GalleryManagement/AddGalleryDetails";
// import EditGalleryDetails from "../pages/GalleryManagement/EditGalleryDetails";
// import CategoryMaster from "../pages/manageCategory/Category";
// import SubCategoryMaster from "../pages/manageCategory/subCategory";
// import SubSubCategoryMaster from "../pages/manageCategory/subSubCategory";
// import EcommerceNewAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceNewAddProduct";
// import Stocks from "../pages/Stocks Management/Stocks";
// import AddStocks from "../pages/Stocks Management/AddStocks";
// import EditStocks from "../pages/Stocks Management/EditStocks";
// import Coupons from "../pages/Coupon Management/Coupons";
// import AddCoupons from "../pages/Coupon Management/AddCoupons";
// import EditCoupons from "../pages/Coupon Management/EditCoupons";
import AddUser from "../pages/Pages/Team/AddUser";
// import ProductMaster from "../pages/products/product";

// import AddProduct from "../pages/products/addProduct";

// import AllOrders from "../pages/Order Managemenr/AllOrders";
// import DailyPriceRates from "../pages/DailyGoldSilverPrice/DailyPriceRates";
// import BannerMaster from "../pages/BannerMaster/bannerMaster.js"
// import BlogMaster from "../pages/BlogMaster/BlogsMaster";

import NewDashboard from "../Dashboard/NewDashboard";
import SubDashboard from "../Dashboard/SubDashboard";
import MenuMater from "../pages/MenuMaster/MenuMater";
import AddMenu from "../pages/MenuMaster/AddMenu";
import RolesResponsibility from "../pages/MenuMaster/RolesResponsibilitiesMaster";
import TestRolesResponsibility from "../pages/MenuMaster/AddRolesResponsibility";
import AdminUser from "../pages/MenuMaster/AdminUser";
import AddAdmin from "../pages/MenuMaster/AddAdmin";
import CommunityUpdateMaster from "../pages/MenuMaster/CommunityUpdateMaster";
import DepartmentType from "../pages/MenuMaster/DepartmentType";
import AddDepType from "../pages/MenuMaster/AddDepType";
import DepartmentGroup from "../pages/MenuMaster/DepartmentGroup";
import AddDepGroup from "../pages/MenuMaster/AddDepGroup";
import ManageDocument from "../pages/MenuMaster/ManageDocument";
import AddDocument from "../pages/MenuMaster/AddDocument";
import DocumentAccess from "../pages/MenuMaster/DocumentAccess";
import AddDocumentAccess from "../pages/MenuMaster/AddDocumentAccess";
import AddTaskMaster from "../pages/MenuMaster/AddTaskMaster";
import AddTask from "../pages/MenuMaster/AddTask";
import AssignMaster from "../pages/MenuMaster/AssignMaster";
import AssignTask from "../pages/MenuMaster/AssignTask";
import AddCommunity from "../pages/MenuMaster/AddCommunity";
import LocationMaster from "../pages/MenuMaster/LocationMaster";
import AddLocation from "../pages/MenuMaster/AddLocation";
import EmployeeRoles from "../pages/MenuMaster/EmployeeRoles";
import AddEmployeeRoles from "../pages/MenuMaster/AddEmployeeRoles";
import AddRolesResponsibility from "../pages/MenuMaster/RolesResponsibility";
import EditRolesResponsibility from "../pages/MenuMaster/EditRolesResponsibility";
import EmployeeMaster from "../pages/MenuMaster/EmployeeMaster";
import AddEmployee from "../pages/MenuMaster/AddEmployee";
import CMSmaster from "../pages/MenuMaster/CMSmaster";
import SignContext from "../contextAPI/Context/SignContext";
import EditDepGrp from "../pages/MenuMaster/EditDepGrp";
import EditDepType from "../pages/MenuMaster/EditDepType";
import EditLocation from "../pages/MenuMaster/EditLocation";
import EditEmployeeRole from "../pages/MenuMaster/EditEmployeeRole";
import EditAddTask from "../pages/MenuMaster/EditAddTask";
import EditMenuMaster from "../pages/MenuMaster/EditMenuMaster";
import EditEmployeeName from "../pages/MenuMaster/EditEmployeeName";
import EditCommunityUpdateMaster from "../pages/MenuMaster/EditCommunityUpdateMaster";
import Editadmin from "../pages/MenuMaster/Editadmin";
import EditAssignTask from "../pages/MenuMaster/EditAssignTask";
import AddTemplate from "../pages/MenuMaster/AddTemplate";
import TaskTemplate from "../pages/MenuMaster/TaskTemplate";
import TaskTemplateMaster from "../pages/MenuMaster/TaskTemplatemaster";
import AssignDashboard from "../Dashboard/AssignDashboard";
import EditTaskTemplate from "../pages/MenuMaster/EditTaskTemplate";



// import customerNew from "../pages/Ecommerce/EcommerceCustomers/customerNew";
const authProtectedRoutes = [
  {
    path: "/dashboard",
    component: (
      <SignState>
        <NewDashboard />
      </SignState>
    ),
  },
  {
    path: "/subdashboard/:id",
    component: (
      <SignState>
        <SubDashboard />
      </SignState>
    ),
  }, {
    path: "/assigndashboard/:id1/:id2",
    component: (
      <SignState>
        <AssignDashboard />
      </SignState>
    ),
  },
  {
    path: "/menumaster",
    component: (
      <SignState>
        <MenuMater />
      </SignState>
    ),
  },
  {
    path: "/add-menu",
    component: (
      <SignState>
        <AddMenu />
      </SignState>
    ),
  },
  {
    path: "roles-responsibilty",
    component: (
      <SignState>
        <RolesResponsibility />
      </SignState>
    ),
  },
  {
    path: "/test-responsibilty",
    component: (
      <SignState>
        <TestRolesResponsibility />
      </SignState>
    ),
  }, {
    path: "/template",
    component: (
      <SignState>
        <Template />
      </SignState>
    ),
  },
  // { path: "/admin-user", component: <AdminUser /> },
  // { path: "/add-user", component: <AddAdmin /> },
  {
    path: "/community-update",
    component: (
      <SignState>
        <CommunityUpdateMaster />
      </SignState>
    ),
  },

  {
    path: "/department-type",
    component: (
      <SignState>
        <DepartmentType />
      </SignState>
    ),
  },
  {
    path: "/admin-user",
    component: (
      <SignState>
        <AdminUser />
      </SignState>
    ),
  },
  {
    path: "/add-dtype",
    component: (
      <SignState>
        <AddDepType />
      </SignState>
    ),
  },

  { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  { path: "/apps-projects-create", component: <CreateProject /> },
  {
    path: "/department-group",
    component: (
      <SignState>
        <DepartmentGroup />
      </SignState>
    ),
  },
  {
    path: "/add-dgroup",
    component: (
      <SignState>
        <AddDepGroup />
      </SignState>
    ),
  },

  { path: "/manage-document", component: <ManageDocument /> },
  { path: "/add-document", component: <AddDocument /> },
  { path: "/document-access", component: <DocumentAccess /> },
  { path: "/add-documentaceess", component: <AddDocumentAccess /> },

  {
    path: "/add-taskmaster",
    component: (
      <SignState>
        <AddTaskMaster />
      </SignState>
    ),
  }, {
    path: "/EditTemplate/:id",
    component: (
      <SignState>
        <EditTemplate />
      </SignState>
    ),
  },
  {
    path: "/add-task",
    component: (
      <SignState>
        <AddTask />
      </SignState>
    ),
  },
  {
    path: "/assign-master",
    component: (
      <SignState>
        <AssignMaster />
      </SignState>
    ),
  },
  {
    path: "/assign-task",
    component: (
      <SignState>
        <AssignTask />
      </SignState>
    ),
  },
  {
    path: "/add-community",
    component: (
      <SignState>
        <AddCommunity />
      </SignState>
    ),
  },
  {
    path: "/edit-communitymaster/:id",
    component: (
      <SignState>
        <EditCommunityUpdateMaster />
      </SignState>
    ),
  },
  {
    path: "/location-master",
    component: (
      <SignState>
        <LocationMaster />
      </SignState>
    ),
  },
  {
    path: "/edit-admin/:id",
    component: (
      <SignState>
        <Editadmin />
      </SignState>
    ),
  },
  {
    path: "/add-location",
    component: (
      <SignState>
        <AddLocation />
      </SignState>
    ),
  },
  {
    path: "/employee-roles",
    component: (
      <SignState>
        {" "}
        <EmployeeRoles />{" "}
      </SignState>
    ),
  },
  {
    path: "/add-employeerole",
    component: (
      <SignState>
        <AddEmployeeRoles />
      </SignState>
    ),
  },
  {
    path: "/add-rolesresponsibility",
    component: (
      <SignState>
        <AddRolesResponsibility />
      </SignState>
    ),
  },

  {
    path: "/employee-master",
    component: (
      <SignState>
        <EmployeeMaster />
      </SignState>
    ),
  },
  {
    path: "/add-employee",
    component: (
      <SignState>
        <AddEmployee />
      </SignState>
    ),
  },

  { path: "/cmsmaster", component: <CMSmaster /> },
  {
    path: "/edit_dggroup/:id",
    component: (
      <SignState>
        <EditDepGrp />
      </SignState>
    ),
  },
  {
    path: "/edit-deptype/:id",
    component: (
      <SignState>
        <EditDepType />
      </SignState>
    ),
  },
  {
    path: "/edit-task/:id",
    component: (
      <SignState>
        <EditAddTask />
      </SignState>
    ),
  },
  {
    path: "/edit-menu/:id",
    component: (
      <SignState>
        <EditMenuMaster />
      </SignState>
    ),
  },
  {
    path: "/edit-location/:id",
    component: (
      <SignState>
        <EditLocation />
      </SignState>
    ),
  },
  {
    path: "/edit-assigntask/:id",
    component: (
      <SignState>
        <EditAssignTask />
      </SignState>
    ),
  },
  {
    path: "/edit-employeerole/:id",
    component: (
      <SignState>
        <EditEmployeeRole />
      </SignState>
    ),
  },
  {
    path: "/edit-rolesresponsibility/:id",
    component: (
      <SignState>
        <EditRolesResponsibility />
      </SignState>
    ),
  },

  {
    path: "/add-user/",
    component: (
      <SignState>
        <AddAdmin />
      </SignState>
    ),
  },
  {
    path: "/edit-employeename/:id",
    component: (
      <SignState>
        <EditEmployeeName />
      </SignState>
    ),
  },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  {
    path: "/pages-profile",
    component: (
      <SignState>
        {" "}
        <SimplePage />{" "}
      </SignState>
    ),
  },
  {
    path: "/pages-profile-settings/:id",
    component: (
      <SignState>
        {" "}
        <Settings />{" "}
      </SignState>
    ),
  },
  // { path: "/pages-team", component: <SignState><Team /></SignState> },
  {
    path: "/newteam",
    component: (
      <SignState>
        <NewTeam />
      </SignState>
    ),
  },
  {
    path: "/adduser",
    component: (
      <SignState>
        <AddUser />
      </SignState>
    ),
  }, {
    path: "/addTemplate",
    component: (
      <SignState>
        <AddTemplate />
      </SignState>
    ),
  },
  {
    path: "/TaskTemplate",
    component: (
      <SignState>
        <TaskTemplate />
      </SignState>
    ),
  },
  {
    path: "/Edit-TaskTemplate/:id",
    component: (
      <SignState>
        <EditTaskTemplate />
      </SignState>
    ),
  },
  {
    path: "/TaskTemplateMaster",
    component: (
      <SignState>
        <TaskTemplateMaster />
      </SignState>
    ),
  },
  { path: "/pages-timeline", component: <Timeline /> },
  { path: "/pages-faqs", component: <Faqs /> },
  { path: "/pages-gallery", component: <Gallery /> },
  { path: "/pages-pricing", component: <Pricing /> },
  { path: "/pages-sitemap", component: <SiteMap /> },
  { path: "/pages-search-results", component: <SearchResults /> },

  //User Profile
  {
    path: "/profile/:id",
    component: (
      <SignState>
        <UserProfile />
      </SignState>
    ),
  },
];

const publicRoutes = [
  // Authentication Page
  {
    path: "/logout",
    component: (
      <SignState>
        <Logout />
      </SignState>
    ),
  },
  {
    path: "/login",
    component: (
      <SignState>
        <Login />
      </SignState>
    ),
  },
  {
    path: "/",
    component: (
      <SignState>
        <Login />
      </SignState>
    ),
  },
  {
    path: "/forgot-password",
    component: (
      <SignState>
        <ForgetPasswordPage />
      </SignState>
    ),
  },
  // { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  {
    path: "/auth-pass-reset-basic",
    component: (
      <SignState>
        <BasicPasswReset />
      </SignState>
    ),
  },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
