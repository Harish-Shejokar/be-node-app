const mongoose = require(`mongoose`);

const activitiesSchema = new mongoose.Schema(
  {
    activity_name: { type: String, required: true },
    activity_description: { type: String, required: true },
  },
  {
    timestamps: {
      created_at: `createdAt`,
      updated_at: `updatedAt`,
    },
  }
);

const activitiesModel = mongoose.model("activites", activitiesSchema);


module.exports = activitiesModel;
