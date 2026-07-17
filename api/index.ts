import app from "../server.js";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
  maxDuration: 60,
};

export default app;
