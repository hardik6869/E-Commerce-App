import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { createSchema, config } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import "dotenv/config";
import { insertSeedData } from "./seeds-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { CartItem } from "./schemas/CartItem";
import extendGraphqlSchema from "./mutation";
import { OrderItem } from "./schemas/OrderItem";
import { Order } from "./schemas/Order";
import { Role } from "./schemas/Role";
import { permissionsList } from "./schemas/fields";

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
  passwordResetLink: {
    async sendToken(args) {
      // send the mail
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: { origin: [process.env.FRONTEND_URL], credentials: true },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log("connect to the Database");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email role { ${permissionsList.join(" ")} }`,
    }),
  })
);
