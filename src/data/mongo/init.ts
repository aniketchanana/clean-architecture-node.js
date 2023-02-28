import config from "../../../config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(config.CONNECTION_URL);
