import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Checkout: React.FC = () => {
  return (
    <div>
      <h3>Checkout</h3>
      <p>Purchase completed!!</p>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <Button variant="contained">go back to home</Button>
      </Link>
    </div>
  );
};

export default Checkout;
