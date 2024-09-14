const express = require('express');
const router = express.Router();
const PinnedItemsModel = require('../models/Pin');
const AdminName = require('../models/adminschema');
const Menumaster = require('../models/MenuMaster');
const getPinnedItems = async (req, res) => {
  try {
    const userId = req.params.userId; // Make sure this parameter name matches your route definition

    const pinnedItems = await PinnedItemsModel.find({ user: userId })
      .populate([
        { path: 'AddTask', select: 'addtask' }

      ])
    if (!pinnedItems) {
      return res.status(404).json({ success: false, message: 'Pinned items not found for the user' });
    }

    // Log the retrieved document to debug
    console.log(pinnedItems);

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error fetching pinned items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Assuming your route is configured like this
const createPinnedItem = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming id is the user's id, change it based on your route

    // Check if the user already has a pinned item document
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });

    if (!pinnedItems) {
      // If not, create a new one
      pinnedItems = await PinnedItemsModel.create({ user: userId });
    }

    const {
      Dashboard,
      MenuMaster,
      AdminUser,
      Template,
      RolesResponsibility,
      CommunityUpdateMaster,
      LocationMaster,
      DepartmentGroup,
      DepartmentType,
      EmployeeRole,
      Employeemaster,
      AddTask,
      AssignMaster,
      // Add other fields according to your schema
    } = req.body;

    // Update the fields in the pinned item document
    pinnedItems.Dashboard = Dashboard || false;
    pinnedItems.MenuMaster = MenuMaster || false;
    pinnedItems.AdminUser = AdminUser || false;
    pinnedItems.CommunityUpdateMaster = CommunityUpdateMaster || false;
    pinnedItems.LocationMaster = LocationMaster || false;
    pinnedItems.DepartmentGroup = DepartmentGroup || false;
    pinnedItems.DepartmentType = DepartmentType || false;
    pinnedItems.EmployeeRole = EmployeeRole || false;
    pinnedItems.Employeemaster = Employeemaster || false;
    pinnedItems.AddTask = AddTask || false;
    pinnedItems.AssignMaster = AssignMaster || false;
    pinnedItems.RolesResponsibility = RolesResponsibility || false,
      pinnedItems.Template = Template || false,
      // Add other fields according to your schema

      // Save the changes
      await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error creating pinned item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateDepartmentGroup = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user's id from the request parameters
    const { DepartmentGroup } = req.body; // Extract the DepartmentGroup value from the request body

    // Find the user's pinned item document. If it doesn't exist, respond with an error
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    // Update only the DepartmentGroup field
    pinnedItems.DepartmentGroup = DepartmentGroup;

    // Save the changes to the document
    await pinnedItems.save();

    // Respond with the updated document
    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating DepartmentGroup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user's id from the request parameters
    const { Template } = req.body; // Extract the DepartmentGroup value from the request body

    // Find the user's pinned item document. If it doesn't exist, respond with an error
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    // Update only the DepartmentGroup field
    pinnedItems.Template = Template;

    // Save the changes to the document
    await pinnedItems.save();

    // Respond with the updated document
    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating Template:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateDepartmentType = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user's id from the request parameters
    const { DepartmentType } = req.body; // Extract the DepartmentGroup value from the request body

    // Find the user's pinned item document. If it doesn't exist, respond with an error
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    // Update only the DepartmentGroup field
    pinnedItems.DepartmentType = DepartmentType;

    // Save the changes to the document
    await pinnedItems.save();

    // Respond with the updated document
    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating DepartmentGroup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateRolesResponsibility = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user's id from the request parameters
    const { RolesResponsibility } = req.body; // Extract the RolesResponsibility value from the request body

    // Find the user's pinned item document. If it doesn't exist, respond with an error
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    // Update only the RolesResponsibility field
    pinnedItems.RolesResponsibility = RolesResponsibility;

    // Save the changes to the document
    await pinnedItems.save();

    // Respond with the updated document
    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating RolesResponsibility:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateAdminUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user's id from the request parameters
    const { AdminUser } = req.body; // Extract the AdminUser value from the request body

    // Find the user's pinned item document. If it doesn't exist, respond with an error
    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    // Update only the AdminUser field
    pinnedItems.AdminUser = AdminUser;

    // Save the changes to the document
    await pinnedItems.save();

    // Respond with the updated document
    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating AdminUser:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateCommunityUpdateMaster = async (req, res) => {
  try {
    const userId = req.params.id;
    const { CommunityUpdateMaster } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.CommunityUpdateMaster = CommunityUpdateMaster;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating CommunityUpdateMaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateEmployeeRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { EmployeeRole } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.EmployeeRole = EmployeeRole;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating EmployeeRole:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update Employeemaster field
const updateEmployeemaster = async (req, res) => {
  try {
    const userId = req.params.id;
    const { Employeemaster } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.Employeemaster = Employeemaster;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating Employeemaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update LocationMaster field
const updateLocationMaster = async (req, res) => {
  try {
    const userId = req.params.id;
    const { LocationMaster } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.LocationMaster = LocationMaster;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating LocationMaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update AddTask field
const updateAddTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const { AddTask } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.AddTask = AddTask;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating AddTask:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; const updateMenuMaster = async (req, res) => {
  try {
    const userId = req.params.id;
    const { MenuMaster } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.MenuMaster = MenuMaster;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating AddTask:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update AssignMaster field
const updateAssignMaster = async (req, res) => {
  try {
    const userId = req.params.id;
    const { AssignMaster } = req.body;

    let pinnedItems = await PinnedItemsModel.findOne({ user: userId });
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Pinned items not found for the user' });
    }

    pinnedItems.AssignMaster = AssignMaster;
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating AssignMaster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update PinnedItems field status
router.patch('/api/update-pinned-items-field/:fieldName', async (req, res) => {
  const { fieldName } = req.params;
  const { status } = req.body;

  try {
    const user = req.user; // Assuming the user is authenticated and available in the request

    // Find the user's PinnedItems document
    const pinnedItems = await PinnedItemsModel.findOne({ user: user._id });

    if (!pinnedItems) {
      return res.status(404).json({ error: 'Pinned items not found for the user' });
    }

    // Update the specified field status
    pinnedItems[fieldName] = status;

    // Save the changes
    await pinnedItems.save();

    res.json({ success: true, data: pinnedItems });
  } catch (error) {
    console.error('Error updating PinnedItems field status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  createPinnedItem, updateDepartmentGroup, getPinnedItems, updateDepartmentType, updateRolesResponsibility,
  updateAdminUser, updateCommunityUpdateMaster, updateEmployeeRole, updateEmployeemaster, updateAddTask,
  updateAssignMaster, updateLocationMaster, updateTemplate, updateMenuMaster
};
