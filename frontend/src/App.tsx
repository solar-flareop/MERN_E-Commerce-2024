import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
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
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not logged in route */}
          <Route path="/login" element={<Login />} />

          {/* Logged user routes */}
          <Route>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* Admin routes */}
          <Route
          // element={
          //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
          // }
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
    </BrowserRouter>
  );
};

export default App;
