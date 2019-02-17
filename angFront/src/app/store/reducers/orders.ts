import {Cart, Order} from '../../models';

export interface State {
  orders: Order;
  cart: Cart;
}

export const initialState: State = {
  cart: {count: 0},
  orders: {
    orders: [],
    ordersPending: false,
    ordersError: false,

    oneOrder: {},
    oneOrderPending: false,
    oneOrderError: false,

    cartCounter: 0,

    cartOrders: [],
    cartOrdersPending: false,
    cartOrdersError: false
  }
};
