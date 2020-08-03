import * as Types from "./types";

export function fetchOrders(prams = null) {
  return {
    type: Types.FETCH_ORDERS_REQUEST,
    payload: prams,
  };
}
