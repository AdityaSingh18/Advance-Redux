import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async(dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FireBaseDataBase}/cart.json`
      );
      if(!response.ok){
        throw new Error('Could Not fetch cart data')
      }

      const data = await response.json();

      return data;
    };

    try{

       const cartData = await fetchData();
       dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity : cartData.totalQuantity
       }))
    }
    catch(err){ 
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Fetching Cart Data Failed",
            })
          );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FireBaseDataBase}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart data Failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sucess!",
          message: "Sent Cart Data Sucess",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data Failed",
        })
      );
    }
  };
};
