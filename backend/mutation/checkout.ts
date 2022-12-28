/* eslint-disable */
import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
} from "../.keystone/schema-types";
import stripeConfig from "../lib/strip";

const graphql = String.raw;

interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
){

  // 1. Make Sure theiy are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry: You must be signed in to create an order!");
  }

  // 2. Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
    id
    name
    email
    cart{
      id
      quantity
      product{
        name
        price
        description
        id
        photo{
          id
          image{
            id
            publicUrlTransformed
          }
        }
      }
    }
    `,
  });
  console.dir(user, { depth: null });

  // 3. Calculate the total price for their order
  const cartItems = user.cart.filter(
    (cartItem: { product: any }) => cartItem.product
  );
  
  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) => {
      return tally + cartItem.quantity * cartItem.product.price;
    },
    0
  );

  // 4. Create the charge with the stripe libarary
  const charge = await stripeConfig.paymentIntents.create({
      amount,
      currency: "INR",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
    
  // 5. Convert the CartItems to OrderItems
  const orderItems = cartItems.map((cartItem => {
    const orderItem = {
       name: cartItem.product.name,
       description: cartItem.product.description,
       price: cartItem.product.price,
       quantity: cartItem.quantity,
       photo: { connect: { id: cartItem.product.photo.id}},
    }
    return orderItem
  }))

  // 6. Create the order and return it
  const order =  await context.lists.Order.createOne({
    data:{
      total: charge.amount,
      charge: charge.id,
      items: {create: orderItems},
      user: {connect: {id: userId}}
    }
  })

  // 7. Clean up any old cart item
  const cartItemIds =  user.cart.map(cartItem => cartItem.id)
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  })
  return order;
}

export default checkout;
