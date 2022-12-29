import { text, select, integer, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isSignedIn, rules } from "../access";
export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },

  ui: {
    listView: {
      initialColumns: ["name", "quantity", "price", , "order", "description"],
    },
  },

  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),

    photo: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),

    price: integer(),
    quantity: integer(),
    order: relationship({ ref: "Order.items" }),
  },
});
