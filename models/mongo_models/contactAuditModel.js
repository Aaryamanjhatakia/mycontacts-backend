const mongoose = require("mongoose");

const contactAuditSchema = new mongoose.Schema(
  {
    contactId: {
      type: Number,
      required: true,
    },

    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true,
    },

    performedBy: {
      type: String,
      default: "system",
    },

    changes: {
      before: { type: Object },
      after: { type: Object },
    },

    requestMeta: {
      ip: String,
      userAgent: String,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model(
  "ContactAuditLog",
  contactAuditSchema,
  "contact_audit_logs",
);
