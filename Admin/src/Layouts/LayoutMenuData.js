import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isCategory, setCategory] = useState(false);
  const [isApps1, setIsApps1] = useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [istask,setIsTask]=useState(false);
  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [Content, setContent] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
    if (iscurrentState !== "category") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-home-2-line",
      link: "/dashboard",
      stateVariables: isDashboard,
    },
    {
      id: "apps",
      label: "Setup",
      icon: "ri-settings-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "appsecommerce",
          label: "Menumaster",
          link: "/menumaster",

          parentId: "apps",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce1",
          label: "Roles Responsibilty",
          link: "/roles-responsibilty",

          parentId: "apps",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce2",
          label: "Admin User",
          link: "/admin-user",

          parentId: "apps",
          stateVariables: isEcommerce,
        },
      ],
    },
    {
      id: "master",
      label: "Master",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps1(!isApps1); // Assuming setIsApps1 is used for Master
        setIscurrentState("Master");
        updateIconSidebar(e);
      },
      stateVariables: isApps1, // Assuming isApps1 is used for Master
      subItems: [
        {
          id: "appsecommerce3",
          label: "Community Update Master",
          link: "/community-update",
          parentId: "master",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce4",
          label: "Location Master",
          link: "/location-master",
          parentId: "master",
          stateVariables: isEcommerce,
        },
      ],
    },

    {
      id: "dmaster",
      label: "Department Master",
      icon: "ri-account-circle-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsDepartment(!isDepartment); // Assuming setIsApps1 is used for Master
        setIscurrentState("dmaster");
        updateIconSidebar(e);
      },
      stateVariables: isDepartment, // Assuming isApps1 is used for Master
      subItems: [
        {
          id: "appsecommerce6",
          label: "Department Group",
          link: "/department-group",
          parentId: "dmaster",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce7",
          label: "Department Type",
          link: "/department-type",
          parentId: "dmaster",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce27",
          label: "Employee Roles",
          link: "/employee-roles",
          parentId: "dmaster",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce28",
          label: "Employee Master",
          link: "/employee-master",
          parentId: "dmaster",
          stateVariables: isEcommerce,
        },
      ],
    },

    {
      id: "taskmaster",
      label: "Task Master",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsTask(!istask); // Assuming setIsApps1 is used for Master
        setIscurrentState("taskmaster");
        updateIconSidebar(e);
      },
      stateVariables: istask, // Assuming isApps1 is used for Master
      subItems: [
        {
          id: "appsecommerce13",
          label: "Add Task",
          link: "/add-taskmaster",
          parentId: "taskmaster",
          stateVariables: isEcommerce,
        },
        {
          id: "appsecommerce12",
          label: "Assign Task",
          link: "/assign-master",
          parentId: "taskmaster",
          stateVariables: isEcommerce,
        },
      ],
    },
    {
      id: "cmsmaster",
      label: "CMS Master",
      icon: "ri-pencil-ruler-2-line",
      link: "/cmsmaster",
      stateVariables: isDashboard,
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
