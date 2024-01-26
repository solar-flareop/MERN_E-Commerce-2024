import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");
  console.log(data);

  if (isError) toast.error("Cannot fetch products!");
  const addToCartHandler = () => {};
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
