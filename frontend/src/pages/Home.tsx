import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");
  console.log(data);

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot fetch products!");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          ...More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="100vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              price={i.price}
              productId={i._id}
              stock={i.stock}
              photo={i.photo}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
