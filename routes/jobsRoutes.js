import express from "express";
const Router = express.Router();
import {
  createJob,
  updateJob,
  getAllJobs,
  deleteJob,
  showStats,
} from "../controllers/jobsController.js";

Router.route("/").post(createJob).get(getAllJobs);
Router.route("/stats").get(showStats);
Router.route("/:id").patch(updateJob).delete(deleteJob);

export default Router;
