import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Alert from "../../Components/Alert/Alert";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart.products);
  const [alert, setAlert] = useState(null);
  const userdata = useSelector((state) => state.auth.userdata);
  const navigate = useNavigate();

  useEffect(() => {
    userdata? setTotal(cart.length) : setTotal(0);
  }, [cart]);

  const onClickHandler = (e) => {
    if (!userdata) {
      e.preventDefault(); 
      setAlert({ type: "warning", message: "Please login first." });
    } else {
      navigate("/myCart");
    }
  };

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div
        onClick={onClickHandler}
        className="bg-primary fixed bottom-12 w-24 left-0 h-12 cartIcon flex items-center justify-end px-5 cursor-pointer"
      >
        <div className="relative">
          <FaBagShopping className="text-white h-[40px] w-[40px] font-light" />
          <div
            className={`${!total ? "text-primary bg-light" : "text-light bg-primary"
              } text-sm h-[20px] w-[20px] rounded-full flex items-center justify-center absolute top-[16px] left-[9px]`}
          >
            {total}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CartIcon);
