const Contact = require("../models/mysql_models/contact_model_sequelize");
const { logContactActivity } = require("../services/auditService");

//Get all contacts
const getAllContacts = async () => {
  return await Contact.findAll();
};

//Get single contact
const getContactById = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

//create contact
const createContact = async (data, req) => {
  const { name, email, phone } = data;

  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  //logging activity
  logContactActivity({
    contactId: newContact.id,
    action: "CREATE",
    before: null,
    after: newContact.toJSON(),
    req,
  }).catch((err) => {
    console.error("Audit failed: ", err.message);
  });

  return newContact;
};

//update contact
const updateContact = async (id, data, req) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    return null; // don't throw here
  }

  const beforeData = contact.toJSON(); //capture before

  await contact.update({
    name: data.name ?? contact.name,
    email: data.email ?? contact.email,
    phone: data.phone ?? contact.phone,
  });

  const afterData = contact.toJSON(); //capture after

  await logContactActivity({
    contactId: contact.id,
    action: "UPDATE",
    before: beforeData,
    after: afterData,
    req,
  }).catch((err) => {
    console.error("Audit failed: ", err.message);
  });

  return contact;
};

//Delete contact
const deleteContact = async (id, req) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    return null;
  }

  const beforeData = contact.toJSON(); //capture before DELETE

  await contact.destroy();

  await logContactActivity({
    contactId: contact.id,
    action: "DELETE",
    before: beforeData,
    after: null,
    req,
  }).catch((err) => {
    console.error("Audit failed: ", err.message);
  });

  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
