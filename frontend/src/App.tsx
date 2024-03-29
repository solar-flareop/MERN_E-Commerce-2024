import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import ProtectedRoute from "./components/protected-route";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Admin routes imports
const Dashboard = lazy(() => import("./pages/admin-pages/dashboard"));
const Products = lazy(() => import("./pages/admin-pages/products"));
const Customers = lazy(() => import("./pages/admin-pages/customers"));
const Transaction = lazy(() => import("./pages/admin-pages/transaction"));
const Barcharts = lazy(() => import("./pages/admin-pages/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin-pages/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin-pages/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin-pages/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin-pages/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin-pages/apps/toss"));
const NewProduct = lazy(
  () => import("./pages/admin-pages/management/newproduct")
);
const ProductManagement = lazy(
  () => import("./pages/admin-pages/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin-pages/management/transactionmanagement")
);

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user?.uid);
        if (data) {
          dispatch(userExist(data?.user));
        }
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not logged in route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged user routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>

          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />
            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
};

export default App;
