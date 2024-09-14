import axios from "axios";
import SignContext from "../Context/SignContext";
import React from "react";

export const SignState = (props) => {
  // const url = `http://localhost:5000`;
  // const url = `${process.env.REACT_APP_BASE_URL}`;

  //Register User
  const registerUser = async (UserInfo) => {
    const formData = new FormData();
    try {
      console.log(formData);
      formData.append("name", UserInfo.name);
      formData.append("email", UserInfo.email);
      formData.append("password", UserInfo.password);
      formData.append("confirmPassword", UserInfo.confirmPassword);
      formData.append("roles", UserInfo.roles);
      formData.append("active", UserInfo.active);
      formData.append("photo", UserInfo.photo);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const loginAdmin = async (AdminInfo) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/authentication`, AdminInfo);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const forgotPersonPassword = async (UserInfo) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/forgotpassword`, UserInfo);

      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  //Reset Password
  const resetPersonPassword = async (resetToken, password) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/users/resetpassword/${resetToken}`,
        { password: password }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const changeadminPassword = async (AdminInfo, Token) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updatepassword`, {
        ...AdminInfo,
        token: Token,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const getLoggedInAdmin = async (Token) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/getloggedinadmin`, {
        token: Token,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const getSpecificAdmin = async (id, role) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/getspecificadminwithroles`, {
        id: id,
        roles: role,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // const getAdmins = async () => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/getadmins`);
  //     return response;
  //   } catch (error) {
  //     return { success: false, msg: "server Error" };
  //   }
  // };


  const updateAdmin = async (AdminInfo, image) => {
    try {
      const formData = new FormData();
      formData.append("name", AdminInfo.name);
      formData.append("roles", AdminInfo.roles);
      formData.append("status", AdminInfo.status);
      formData.append("id", AdminInfo._id);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updateadmin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  

  const setEditUserRoleValues = async (id, name, email, password, image, location, departmentGroup, departmentType, Role, status) => {
    const formData = new FormData()
    try {
      console.log(name);

      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", departmentGroup);

      formData.append("name", name);
      formData.append("email", email);
      if (!image) {
        // Fetch existing image path from the database
        const existingAdmin = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/getadminbyid/${id}`);
        if (existingAdmin.data.uploadimage) {
          image = existingAdmin.data.image;
        }
      }
      formData.append("image", image);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("departmentGroup", departmentGroup);
      formData.append("departmentType", departmentType);
      formData.append("Role", Role);
      formData.append("status", status);
    
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/editadmin/${id}`,
        formData,
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const GetallAdminname = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/getadmins`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const Deleteadmin = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/deleteadmin/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };


  // Get roles
  const GetRoles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/roles/getroles`, {});
      return response;
    } catch (error) {
      console.log("erros is ", error);
      return { success: false, msg: "server Error" };
    }
  };

  // GetrolesSpecificpermissions
  const GetRoleSpecificPermission = async (role) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/getrolespecificpermisson`, {
        role: role,
      });
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // integration by vaishal

  //opa integration begins.........

  const addDepGroup = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/adddepartmentgroup`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addMenu = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/menu/addmenumaster`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addDepType = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/adddepartmenttype`,

        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addTask = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addtask/addnewtask`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addRolesandResponsibility = async (locationSchema, departmentGroup, departmentType, employeeRole, employeeName, email, password, isActive, Dashboard, MenuMaster, AdminUser, CommunityUpdateMaster, LocationMaster, DepartmentGroup, DepartmentType, EmployeeRole, Employeemaster, AddTask, AssignMaster, CMS) => {
    const formData = new FormData()
    try {

      // formData.append("locationSchema", locationSchema);
      // formData.append("departmentGroup", departmentGroup);
      // formData.append("departmentType", departmentType);
      // formData.append("employeeRole", employeeRole);
      // formData.append("employeeName", employeeName);

      // formData.append("email",email);
      // formData.append("password", password);
      // formData.append("isActive", isActive);
      // formData.append("Dashboard", Dashboard);
      // formData.append("MenuMaster", MenuMaster);
      // formData.append("Roles", Roles);
      // formData.append("AdminUser", AdminUser);
      // formData.append("CommunityUpdateMaster", CommunityUpdateMaster);
      // formData.append("LocationMaster", LocationMaster);
      // formData.append("DepartmentGroup", DepartmentGroup);

      // formData.append("DepartmentType", DepartmentType);
      // formData.append("EmployeeRole", EmployeeRole);
      // formData.append("Employeemaster", Employeemaster);
      // formData.append("AddTask", AddTask);
      // formData.append("AssignMaster", AssignMaster);
      // formData.append("CMS", CMS);

      // console.log("hii",employeeName)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/addRolesResponsibilities`, { locationSchema, departmentGroup, departmentType, employeeRole, employeeName, email, password, isActive, Dashboard, MenuMaster, AdminUser, CommunityUpdateMaster, LocationMaster, DepartmentGroup, DepartmentType, EmployeeRole, Employeemaster, AddTask, AssignMaster, CMS }

      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  }

  const deletegrp = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/deletedepartmentgroup/${id}`
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const deletetype = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/deletedepartmenttype/${id}`
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addLocation = async (depGrpData) => {
    try {
      console.log(depGrpData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/location/addlocation`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const addEmployeeRole = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employeerole/adddemployeerole`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addEmployeeName = async (depGrpData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employeename/adddemployeename`,
        depGrpData
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetallDepartmentGroup = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/getdepartments`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetallAssignTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntask`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetallDepartmentType = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/getdepartmentstypes`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetallMenuMaster = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/menu/getallmenumaster`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetDepTypeById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/departmenttypebygroup/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const GetSpecificTaskByDepartmentGroup = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/addtask/getalltaskbydtype/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const GetEmployeeRoleById = async (id, id1) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employeerole/getemployeerolebygroupandtype/${id}/${id1}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };


  const GetDepTypeByIdForEditing = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/getdepartmenttypebyid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const GetEmployeeRoleByIdForEditing = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employeerole/getemployeerolebyid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const EditDepGrp = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/getdepartmentbyid/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const setEditDepGrpValues = async (id, name, isActive) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/editdepartmentgroup/${id}`,
        { name, isActive }
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const setEditAddTaskValues = async (
    id,
    departmentType,
    taskName,
    taskType,
    accessLocation,
    detail,
    isActive
  ) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/addtask/edittask/${id}`, {
        departmentType,
        taskName,
        taskType,
        accessLocation,
        detail,
        isActive,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const setEditLocationValues = async (id, name, isActive) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/location/editlocation/${id}`, {
        name,
        isActive,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const setEditDepTypeValues = async (id, departmentGroup, name, isActive) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmenttype/editdepartmenttype/${id}`,
        { departmentGroup, name, isActive }
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const setEditMenuMastervalues = async (id, menugroup, menuname, isActive) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/menu/editmenumaster/${id}`, {
        menugroup,
        menuname,
        isActive,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const setEditEmployeeRoleValues = async (
    id,
    departmentGroup,
    departmentType,
    EmployeeRole,
    isActive
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employeerole/editemployeerole/${id}`,
        { departmentGroup, departmentType, EmployeeRole, isActive }
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const GetallEmployeeRole = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employeerole/getemployeeroles`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetallLocation = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/location/getlocations`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetallEmployeeName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenames`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const addCommMaster = async (name, message, uploadimage, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive) => {
    const formData = new FormData()
    try {
      console.log(name);
      console.log(message);
      console.log(locationSchema);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", departmentGroup);
      console.log("uploadimage:-", uploadimage);
      formData.append("name", name);
      formData.append("message", message);
      formData.append("uploadimage", uploadimage);
      formData.append("locationSchema", locationSchema);
      formData.append("departmentGroup", departmentGroup);
      formData.append("departmentType", departmentType);
      formData.append("employeeRole", employeeRole);
      formData.append("employeeName", employeeName);
      formData.append("isActive", isActive);

      // console.log("hii",employeeName)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/communitymaster/addcommunitymessages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }


      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  }
  const addadmin = async (name, email, password, location, departmentGroup, departmentType, Role, status, image) => {
    const formData = new FormData()
    try {
      console.log(name);
      // console.log(message);
      //console.log(locationSchema);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", departmentGroup);
      //console.log("uploadimage:-",uploadimage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("departmentGroup", departmentGroup);
      formData.append("departmentType", departmentType);
      formData.append("Role", Role);
      formData.append("status", status);

      // console.log("hii",employeeName)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/addadminname`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }


      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  }
  const GetUserRoleByIdForEditing = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/getadminbyid/${id}`, {});
      return response;
    }
    catch (error) {
      console.log("Error During API call: ", error)
    }

  }
  const addAssignTaskmaster = async (documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,uploaddocument,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive) => {
    try {
      const formData=new FormData();
      formData.append("documentname", documentname);
      formData.append("documentdepartmenttype",documentdepartmenttype);
      formData.append("tasktypes", tasktypes);
      formData.append("documenttype",documenttype);
      formData.append("formlink", formlink);
    formData.append("documentlink", documentlink);
    formData.append("uploaddocument", uploaddocument);
    formData.append("documentdescription", documentdescription);
    formData.append("locationSchema",locationSchema);
    formData.append("departmentGroup", departmentGroup);
  formData.append("departmentType", departmentType);
  formData.append("employeeRole", employeeRole);
  formData.append("employeeName", employeeName);
    formData.append("isActive", isActive);

      const response = await axios.post(`
        ${process.env.REACT_APP_BASE_URL}/assigntask/addassigntask`,formData,{headers: {
          "Content-Type": "multipart/form-data",
        },}
     
        
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetallAddTask = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getalltask`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const DeleteLocation = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/location/deletelocationbyid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const DeleteEmployeeRole = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/employeerole/deleteemployerole/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const DeleteEmployeeName = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/employeename/deleteemployeename/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const DeleteAddTask = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/addtask/deletetask/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const DeleteAssignTask = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/assigntask/deleteassigntask/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "Server Error" };
    }
  };
  const editAssignTask = async (id, updatedData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/assigntask/editassigntask/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "Server Error" };
    }
  };
  const DeleteMenuMaster = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/menu/deletemenu/${id}`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetLocationById = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/location/getlocationbyid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetSpecificAssignTaskById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetSpecificAssignTaskByDeptId = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyDeptid/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetSpecificMenuMaster = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/menu/getspecificmenu/${id}`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetAddTaskById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/addtask/getspecifictask/${id}`,
        {}
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const GetEmployeeNameIdForEditing = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employeename/getemployeenamebyid/${id}`, {});
      return response;
    }
    catch (error) {
      console.log("Error During API call: ", error)
    }

  }
  const setEditEmployeeNameValues = async (id, location,departmentGroup, departmentType, EmployeeRole, name,email,password ,isActive) => {
    try {
      // console.log(">>",dep)
      // console.log(">>>",isActive);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/employeename/editemployeename/${id}`,
        { location,departmentGroup, departmentType, EmployeeRole, name,email,password, isActive }
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const getReqCommDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`
      );
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };
  const DeleteCommunityMaster = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/communitymaster/deleteCommunity/${id}`, {});
      return response;
    }

    catch (error) {
      return { success: false, msg: "Server Error" }
    }
  };
  const GetCommunityNameIdForEditing = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getspecificcommunitymessage/${id}`, {}

      );
      return response;
    }
    catch (error) {
      console.log("Error During API call: ", error)
    }
  };
  const setEditCommunityMasterName = async (id, name, message, uploadimage, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive) => {
    const formData = new FormData()
    try {
      console.log(name);
      // console.log(message);
      //console.log(locationSchema);
      // const circularReplacer = () => {
      //   const seen = new WeakSet();
      //   return (key, value) => {
      //     if (typeof value === "object" && value !== null) {
      //       if (seen.has(value)) {
      //         return; // Skip circular references
      //       }
      //       seen.add(value);
      //     }
      //     return value;
      //   };
      // };

      formData.append("name", name);
      console.log("name", name);
      formData.append("message", message);
      console.log("form Data message", message);
      // formData.append("uploadimage", uploadimage);
      // console.log("uploadimage", uploadimage);
      if (!uploadimage) {
        // Fetch existing image path from the database
        const existingCommunityMaster = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getspecificcommunitymessage/${id}`);
        if (existingCommunityMaster.data.uploadimage) {
          uploadimage = existingCommunityMaster.data.uploadimage;
        }
      }
      formData.append("uploadimage", uploadimage);
      console.log("uploadimage",uploadimage);
      // formData.append("email",email);
      // JSON.stringify(value);
      // const value=JSON.stringify(value);
      // const jsonString = JSON.stringify(obj, (key, value) => {
      //   if (typeof value === 'object' && value !== null) {
      //     if (visitedObjects.has(value)) {
      //       // Circular reference found, discard key
      //       return;
      //     }
      //     // Store value in our set
      //     visitedObjects.add(value);
      //   }
      //   return value;
      // });

      const extractedlocationvalues = locationSchema.map(loc => loc.value);
      const extracteddepartmentgroup = departmentGroup.map(dep => dep.value);
      const extracteddepartmenttype = departmentType.map(type => type.value);
      const extractedemployeerole = employeeRole.map(role => role.value);
      const extractedemployeename = employeeName.map(name => name.value);


      formData.append("locationSchema", extractedlocationvalues);
      // formData.append("locationSchema", locationSchema.join(','));

      // locationSchema.forEach((location) => {
      //   formData.append("locationSchema", location.value);
      // });


      // // locationSchema.forEach((value, index) => {
      //   formData.append(`locationSchema`, value);
      // // });
      // console.log("location is thisss",locationSchema)
      formData.append("departmentGroup", extracteddepartmentgroup);
      // formData.append("departmentGroup", departmentGroup.join(','));
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", extracteddepartmentgroup);
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",departmentGroup);
      formData.append("departmentType", extracteddepartmenttype);
      // formData.append("departmentType", departmentType.join(','));
      console.log(">>>>>>>>>>>department type", extracteddepartmenttype)
      formData.append("employeeRole", extractedemployeerole);
      // formData.append("employeeRole",extractedemployeerole);
      // console.log(">>>>>>>employeeRole",extractedemployeerole);
      // formData.append("employeeName", extractedemployeename);
      formData.append("employeeName", extractedemployeename);
      console.log(">>>>employeeName", extractedemployeename)
      formData.append("isActive", isActive);
      console.log("active", isActive);

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/communitymaster/editcommunitymessages/${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  // const setEditAssignTask = async (id, documentname, documentdepartmenttype, tasktypes, formlink, documenttype, uploaddocument, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive) => {
  //   console.log(">>>>>>>>>id")
  //   console.log("tushya", documentname);
  //   // const formData = new FormData();
  //   const locationIds = locationSchema.map(item => item.value);
  //   const departmentGroupIds = departmentGroup.map(item => item.value);
  //   const departmentTypeIds = departmentType.map(item => item.value);
  //   const employeeRoleIds = employeeRole.map(item => item.value);
  //   const employeeNameIds = employeeName.map(item => item.value);
  //   try {

  //     const response = await axios.put(
  //       `${process.env.REACT_APP_BASE_URL}/assigntask/editassigntask/${id}`,
  //       {
  //         documentname, documentdepartmenttype, tasktypes, formlink, documenttype, uploaddocument, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive
  //       },
  //     );

  //     return response;
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   }
  // };
  const setEditAssignTask = async (id, documentname, documentdepartmenttype, tasktypes, formlink, documenttype, uploaddocument, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive) => {
    console.log(">>>>>>>>>id")
    console.log("tushya", documentname);
    // const formData = new FormData();
    const locationIds = locationSchema.map(item => item.value);
    const departmentGroupIds = departmentGroup.map(item => item.value);
    const departmentTypeIds = departmentType.map(item => item.value);
    const employeeRoleIds = employeeRole.map(item => item.value);
    const employeeNameIds = employeeName.map(item => item.value);
    try {

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/assigntask/editassigntask/${id}`,
        {
          documentname, documentdepartmenttype, tasktypes, formlink, documenttype, uploaddocument, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive
        },
      );

      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  return (
    <SignContext.Provider
      value={{
        registerUser,
        GetRoles,
        addadmin,
        GetRoleSpecificPermission,
        addDepGroup,
        GetallDepartmentGroup,
        addDepType,
        GetDepTypeById,
        addEmployeeRole,
        addLocation,
        deletegrp,
        GetallDepartmentType,
        deletetype,
        GetallAdminname,
        Deleteadmin,
        EditDepGrp,
        setEditDepGrpValues,
        GetDepTypeByIdForEditing,
        setEditDepTypeValues,
        GetallEmployeeRole,
        GetallLocation,
        DeleteLocation,
        GetUserRoleByIdForEditing,
        GetLocationById,
        setEditLocationValues,
        DeleteEmployeeRole,
        GetEmployeeRoleByIdForEditing,
        setEditEmployeeRoleValues,
        GetEmployeeRoleById,
        addEmployeeName,
        GetallEmployeeName,
        DeleteEmployeeName,
        setEditUserRoleValues,
        addTask,
        GetallAddTask,
        DeleteAddTask,
        DeleteAssignTask,
        editAssignTask,
        GetAddTaskById,
        setEditAddTaskValues,
        addCommMaster,
        addMenu,
        GetallMenuMaster,
        DeleteMenuMaster,
        GetSpecificMenuMaster,
        setEditMenuMastervalues,
        GetSpecificTaskByDepartmentGroup,
        addAssignTaskmaster,
        GetallAssignTask,
        GetEmployeeNameIdForEditing,
        setEditEmployeeNameValues,
        getReqCommDetails,
        DeleteCommunityMaster,
        GetCommunityNameIdForEditing,
        setEditCommunityMasterName,
        loginAdmin,
        forgotPersonPassword,
        getLoggedInAdmin,
        changeadminPassword,
        resetPersonPassword,
        getSpecificAdmin,
        updateAdmin,
        // getAdmins,
        addRolesandResponsibility,
        GetSpecificAssignTaskById,
        GetSpecificAssignTaskByDeptId,
        setEditAssignTask,
        GetallAdminname
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};

