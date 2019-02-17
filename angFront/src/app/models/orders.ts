import {Order} from "./order";
import {Cart} from "./cart";

export interface Orders {
  orders: Order[],
  ordersPending: boolean,
  ordersError: boolean,

  oneOrder: Order,
  oneOrderPending: boolean,
  oneOrderError: boolean,

  cart: {},
  cartCounter: number,

  cartOrders: Cart[],
  cartOrdersPending: boolean,
  cartOrdersError: boolean
}
