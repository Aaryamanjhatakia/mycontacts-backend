const ContactAuditLog = require("../models/mongo_models/contactAuditModel");

const logContactActivity = async ({
  contactId,
  action,
  before,
  after,
  req,
}) => {
  try {
    await ContactAuditLog.create({
      contactId,
      action,
      changes: {
        before,
        after,
      },

      requestMeta: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });
  } catch (err) {
    console.error("Audit logging failed:", err.message);
  }
};

module.exports = { logContactActivity };
