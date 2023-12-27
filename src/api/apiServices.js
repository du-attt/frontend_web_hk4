import axios from "axios";
import {
  CART_URL,
  PRODUCTS_URL,
  LOGIN_URL,
  SIGNUP_URL,
  WISHLIST_URL,
  CATEGORIES_URL,
  VNPAY_URL,
  INVOICE_URL,
} from "./apiUrls";

export const loginService = (email, password) =>
  axios.post(LOGIN_URL, { email, password });

export const signupService = (username, email, password) =>
  axios.post(SIGNUP_URL, { username, email, password });

export const getAllProductsService = () => axios.get(PRODUCTS_URL);

export const getProductByIdService = (productId) =>
  axios.get(`${PRODUCTS_URL}/${productId}`);

export const getCartItemsService = (token) =>
  axios.get(CART_URL, {
    headers: {
      authorization: token,
    },
  });

export const postAddProductToCartService = (product, token) =>
  axios.post(
    CART_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const postUpdateProductQtyCartService = (productId, type, token) =>
  axios.post(
    `${CART_URL}/${productId}`,
    {
      action: {
        type,
      },
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromCartService = (productId, token) =>
  axios.delete(`${CART_URL}/${productId}`, {
    headers: {
      authorization: token,
    },
  });



  
export const getWishlistItemsService = (token) =>
  axios.get(WISHLIST_URL, {
    headers: {
      authorization: token,
    },
  });

export const postAddProductToWishlistService = (product, token) =>
  axios.post(
    WISHLIST_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromWishlistService = (productId, token) =>
  axios.delete(`${WISHLIST_URL}/${productId}`, 
  {
    headers: {
      authorization: token,
    },
  });

export const postVNPay = (type,token) =>
  axios.post(VNPAY_URL,
    {
      action: {
        type,
      },
    },
    {
      headers: {
        authorization: token,
      },
    });
export const postInvoice = (type,token) =>
  axios.post(INVOICE_URL,
    {
      action: {
        type,
      },
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
export const getInvoice = (token) =>
  axios.get(INVOICE_URL,
  {
    headers: {
      authorization: token,
    },
  });

export const getInvoiceDetail = (invoiceId, token) =>
  axios.get(`${INVOICE_URL}/${invoiceId}`,
  {
    headers: {
      authorization: token,
    },
  });
// export const getCheckInvoice = (token) =>
//   axios.get(`https://localhost:7060/api/check`,
//   {
//     headers: {
//       authorization: token,
//     },
//   });
export const postMomoUrl = (type,token) =>
  axios.get(`https://localhost:7060/api/momo`,
  
  {
    headers: {
      authorization: token,
    },
  });


export const getAllCategoriesService = () => axios.get(CATEGORIES_URL);
