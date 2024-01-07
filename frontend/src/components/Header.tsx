import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const user = {
  _id: "1",
  role: "admin",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeDialogHandler = () => setIsOpen(false);

  const logoutHandler = () => {
    setIsOpen(false);
    alert("Logout");
  };

  return (
    <nav className="header">
      <Link onClick={closeDialogHandler} to={"/"}>
        Home
      </Link>
      <Link onClick={closeDialogHandler} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={closeDialogHandler} to={"/cart"}>
        <FaShoppingBag />
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user?.role === "admin" && (
                <Link onClick={closeDialogHandler} to="/admin/dashboard">
                  Admin
                </Link>
              )}
              <Link onClick={closeDialogHandler} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
