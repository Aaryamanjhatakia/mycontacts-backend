// @ts-check
//THIS CONTROLLER CONTAINS THE REQUEST HANDLING AND SERVICE LOGIC TO IMPLEMENT CRUD OPERATIONS IN MONGODB USING ODM MONGOOSE
//AND MYSQL USING RAW SQL QUERIES
const asyncHandler = require("express-async-handler");
const { pool } = require("../config/mysql.js");
//THE COMMENTED PART IS THE CODE TO IMPLEMENT CRUD OPERATIONS IN MONGODB
//const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access public

// const getContacts = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find();
//   res.status(200).json(contacts);
// });

//@desc Create New Contact
//@route POST /api/contacts
//@access public

// const createContact = asyncHandler(async (req, res) => {
//   console.log("The request body is : ", req.body);

//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error("All fields are mandatory !");
//   }

//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//   });

//   res.status(201).json(contact);
// });

//@desc Get Contact
//@route GET /api/contacts/:id
//@access public

// const getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(contact);
// });

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public

// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//   );

//   res.status(200).json(updatedContact);
// });

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public

// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findByIdAndDelete(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   res.status(200).json(contact);
// });

// module.exports = {
//   getContacts,
//   createContact,
//   getContact,
//   updateContact,
//   deleteContact,
// };

//@desc get Contacts (MySQL)
//@route POST /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM contacts");
  res.status(200).json(rows);
});

//@desc Create New Contact (MySQL)
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);

  const { name, email, phone } = req.body;

  // Validation (same as Mongo)
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // SQL query
  const sql = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";

  // Execute query
  const [result] = await pool.execute(sql, [name, email, phone]);

  /**
   * result.insertId → auto-generated ID from MySQL
   */

  // Send response
  res.status(201).json({
    // @ts-ignore
    id: result.insertId,
    name,
    email,
    phone,
  });
});

//@desc Get Contact (MySQL)
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = req.params.id;
  const { name, email, phone } = req.body;

  const sql = "SELECT * FROM contacts WHERE id = ?";

  const [rows] = await pool.execute(sql, [contact]);

  //if no rows found
  // @ts-ignore
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //send the first row
  // @ts-ignore
  res.status(200).json(rows[0]);
});

//@desc Update Contact (MySql)
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = req.params.id;

  //check if contact exists
  const check_sql = "SELECT id FROM contacts WHERE id = ?";

  const [rows] = await pool.execute(check_sql, [contact]);

  // @ts-ignore
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const { name, email, phone } = req.body;

  //Update contact
  const update_sql = `UPDATE contacts SET
      name  = COALESCE(?, name),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone)
    WHERE id = ?`;

  const [result] = await pool.execute(update_sql, [
    name ?? null,
    email ?? null,
    phone ?? null,
    contact,
  ]);

  // Fetch updated contact
  const [updatedRows] = await pool.execute(
    "SELECT * FROM contacts WHERE id = ?",
    [contact],
  );

  // Send response
  // @ts-ignore
  res.status(200).json(updatedRows[0]);
});

//@desc Delete Contact (MySql)
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = req.params.id;

  //check if contact exists
  const check_sql = "SELECT id FROM contacts WHERE id = ?";

  const [rows] = await pool.execute(check_sql, [contact]);

  // @ts-ignore
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const delete_sql = `DELETE FROM contacts WHERE id = ?`;
  const [result] = await pool.execute(delete_sql, [contact]);

  res.status(200).json({
    message: "Contact deleted successfully",
    id: contact,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
