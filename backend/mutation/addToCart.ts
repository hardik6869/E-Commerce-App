import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) => {
  console.log("ADDING TO CART");

  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }

  // 2. Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveField: "id,quantity",
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(productId);
    
    console.log(existingCartItem);
    
    // 3. See if the current item is in their cart
    // 4. If it is, Increment by 1
    console.log(
      `There are already ${existingCartItem.quantity}, Increment by 1!`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  // 5. If it isn't, create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
};

export default addToCart;
