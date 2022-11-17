import "dotenv/config";
import { createSchema, config } from "@keystone-next/keystone/schema";

const databaseURL = process.env.DATABASE_URL;
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOCKIE_SECRET,
};

export default config({
  server: {
    cors: { origin: [process.env.FRONTEND_URL], credentials: true },
  },
  db: { adapter: "mongoose", url: databaseURL },
  lists: createSchema({
    // Schema item go in here
  }),
  ui: {
    // TODO: change,this for role
    isAccessAllowed: () => true,
  },
});
