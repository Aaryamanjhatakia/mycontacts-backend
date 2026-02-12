//This is the implementation to perform crud operations on a mysql database using Sequelize(ORM)

const asyncHandler = require("express-async-handler");
const contactService = require("../services/contactService");

//@desc Get all contacts
//@route GET api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.getAllContacts();
  res.status(200).json(contacts);
});

//@desc create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);

  const { name, email, phone } = req.body;

  //Validation
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const newContact = await contactService.createContact(req.body, req);

  //send response
  res.status(201).json({
    id: newContact.id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
  });
});

//@desc Get Contact (Sequelize)
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;

  //Find by primary key(id)
  const contact = await contactService.getContactById(contactId);

  //If no record found
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //Send result
  res.status(200).json(contact);
});

//@desc Update Contact (Sequelize)
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const updatedContact = await contactService.updateContact(
    req.params.id,
    req.body,
    req,
  );

  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  //send updated contact
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  //Delete Contact
  const deletedContact = await contactService.deleteContact(req.params.id, req);

  if (!deletedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //send response
  res.status(200).json({
    message: "Contact deleted successfully",
    id: deletedContact.id,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
