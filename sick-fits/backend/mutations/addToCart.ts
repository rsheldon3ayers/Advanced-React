/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('ADDING TO CART');
  // 1. Query the current user signed in?
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user cart
  const allCartItems = await context.lists.cartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `there are already ${existingCartItem.quantity}, increment by 1`
    );
     // 3. See if the current item is in their cart
     // 4. if it is, increment by 1
    return await context.lists.cartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 4.1 if it isn't, creat a new cart item
  return await context.lists.CartItem.createOne({
      data: {
          product: { connect: {id: productId}},
          user: { connect: {id: sesh.itemId}},
      }
  })
}
export default addToCart;
