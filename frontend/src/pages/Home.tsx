import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
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
        <ProductCard
          name={"Macbook"}
          price={30000}
          productId={"abc"}
          stock={4}
          photo={
            "https://rukminim2.flixcart.com/image/416/416/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70"
          }
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
