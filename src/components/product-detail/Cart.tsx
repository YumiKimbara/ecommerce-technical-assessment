import { useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import "./styles.css";

interface ProductType {
  id: string;
  quantity: number;
}

interface AddedProductType {
  prodsAddedToCart: ProductType[];
  setProdsAddedToCart: (value: ProductType[]) => void;
}

const Cart: React.FC<AddedProductType> = ({
  prodsAddedToCart,
  setProdsAddedToCart,
}) => {
  const handleDeleteProd = useCallback(
    (id: string) => {
      const updatedProds = prodsAddedToCart.filter((prod: ProductType) => {
        return prod.id !== id;
      });
      localStorage.setItem("cart", JSON.stringify(updatedProds));
      setProdsAddedToCart(updatedProds);
    },
    [prodsAddedToCart, setProdsAddedToCart]
  );

  const handleCheckout = useCallback(() => {
    if (prodsAddedToCart.length === 0) return;
    localStorage.removeItem("cart");
  }, [prodsAddedToCart.length]);

  return (
    <div className="cartWrapper">
      <h3>Cart</h3>
      {prodsAddedToCart.length ? (
        prodsAddedToCart.map((prod: ProductType) => {
          return (
            <div key={prod.id}>
              <div>
                <h4>Product ID: {prod.id}</h4>
                <p>Quantity: {prod.quantity}</p>
              </div>
              <div className="button">
                <Button
                  fullWidth
                  className="button"
                  variant="contained"
                  onClick={() => handleDeleteProd(prod.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No Items in the cart</p>
      )}
      <Link
        to={{
          pathname: prodsAddedToCart.length !== 0 ? "/checkout" : "#",
        }}
      >
        <div className="button">
          <Button
            style={{ backgroundColor: "#FFA41C" }}
            fullWidth
            variant="contained"
            disabled={prodsAddedToCart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
