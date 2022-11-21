import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { createSchema, config } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import "dotenv/config";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOCKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default withAuth(
  config({
    server: {
      cors: { origin: [process.env.FRONTEND_URL], credentials: true },
    },
    db: { adapter: "mongoose", url: databaseURL },
    lists: createSchema({
      User,
      Product,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        return session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id",
    }),
  })
);
