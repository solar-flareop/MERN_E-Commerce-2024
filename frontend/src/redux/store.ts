import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderAPI";
import { dashBoardAPI } from "./api/dashBoardAPI";

export const SERVER = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [dashBoardAPI.reducerPath]: dashBoardAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware,
      dashBoardAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

// import { configureStore } from "@reduxjs/toolkit";
// import { productAPI } from "./api/productAPI";
// import { userAPI } from "./api/userAPI";
// import { userReducer } from "./reducer/userReducer";
// import { cartReducer } from "./reducer/cartReducer";
// import { orderAPI } from "./api/orderAPI";
// import { dashBoardAPI } from "./api/dashBoardAPI";

// export const SERVER = import.meta.env.VITE_SERVER;

// export const store = configureStore({
//   reducer: {
//     [userAPI.reducerPath]: userAPI.reducer,
//     [productAPI.reducerPath]: productAPI.reducer,
//     [orderAPI.reducerPath]: orderAPI.reducer,
//     [dashBoardAPI.reducerPath]: dashBoardAPI.reducer,
//     [userReducer.name]: userReducer.reducer,
//     [cartReducer.name]: cartReducer.reducer,
//   },
//   middleware: (mid) => [
//     ...mid(),
//     userAPI.middleware,
//     productAPI.middleware,
//     orderAPI.middleware,
//     dashBoardAPI.middleware,
//   ],
// });

// export type RootState = ReturnType<typeof store.getState>;
