import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";

import {
  useAuthContext,
  useCartContext,
  useProductsContext,
  useWishlistContext,
} from "../contexts";
import { getProductByIdService } from "../api/apiServices";
import { StarRating,Similar,Glasses } from "../components";
import { notify } from "../utils/utils";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { token } = useAuthContext();
  const { getProductById, allProducts } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  const [loading, setLoading] = useState(false);
  const product = getProductById(productId);
  const [selectedColor, setSelectedColor] = useState("");


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getProductByIdService(productId);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [allProducts]);
  // Giữ luôn ở ở đầu trang khi click vào
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
        <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
          <section className="relative p-7 bg-black/[0.075]  flex items-center justify-center rounded-lg">
            <img
              src={product?.image}
              alt=""
              className="w-full object-contain max-w-xs"
            />
          </section>

          <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
            <div className="flex flex-col gap-2">
              <h1 className=" text-2xl sm:text-4xl font-bold">{product?.name}</h1>
              <p className=" text-gray-600 text-sm sm:text-base">
                {product?.description}
              </p>
              <div className="flex items-center gap-1">
                <StarRating />

                <span className="text-xs text-gray-400">
                  ({product?.rating}) Xếp hạng
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2  ">
              <h2 className="  text-lg font-semibold">Chi tiết</h2>
              <ul className="flex gap-5">
                <div>
                  <li>
                    <span className="text-gray-500 text-sm">Thương hiệu: </span>
                    {product?.brand}
                  </li>
                  <li>
                    <span className="text-gray-500 text-sm">Danh mục: </span>
                    {product?.category}
                  </li>
                </div>
                <div>
                  <li>
                    <span className="text-gray-500 text-sm">Giới tính: </span>
                    {product?.gender}
                  </li>
                  <li>
                    <span className="text-gray-500 text-sm">Trọng lượng: </span>
                    {product?.weight}
                  </li>
                </div>
              </ul>
            </div>

            <div className="flex gap-2 items-center pb-10 sm:pb-0">
              Giá:
              <span className="ms-1 text-xl sm:text-2xl text-amber-600">
                {product?.newPrice}VNĐ
              </span>
              <span className="text-sm text-gray-600 line-through">
                {product?.price}VNĐ
              </span>
            </div>
            <>
                <Glasses
                  onSelectedColor={setSelectedColor}
               />
            </>
            <div className={`w-full flex gap-4 items-center flex-wrap`}>
              <button
                className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
                
                disabled={disableCart || !selectedColor}
                onClick={() => {
                  if (!token) {
                    navigate("/login", { state: { from: location.pathname } });
                    notify("warn", "Vui lòng đăng nhập để tiếp tục");
                  } else {
                    if (!product?.inCart) {
                      product.description = selectedColor;
                      addProductToCart(product);
                    } else {
                      navigate("/cart");
                    }
                  }
                }}
              >
                <HiOutlineShoppingBag />{" "}
                {product?.inCart ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
              </button>
              
              <button
                className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
                disabled={disableWish}
                onClick={() => {
                  if (!token) {
                    navigate("/login", { state: { from: location.pathname } });
                    notify("warn", "Vui lòng đăng nhập để tiếp tục");
                  } else {
                    if (product?.inWish) {
                      deleteProductFromWishlist(product._id);
                    } else {
                      addProductToWishlist(product);
                    }
                  }
                }}
              >
                {product?.inWish ? (
                  <>
                    <BsFillBookmarkHeartFill />
                    <span>Xóa khỏi yêu thích</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <BsBookmarkHeart /> <span>Yêu thích</span>
                  </>
                )}{" "}
              </button>
            </div>
            
          </section>
          
        </main>
      </div>
      <section className="w-full" >
           <hr className="w-full"/>
          <br />
          <h1 className=" text-2xl sm:text-4xl font-bold">Đánh giá sản phẩm</h1>
                    
          <div className="flex p-6 rounded-md shadow-sm bg-black/[0.05]">
              <div>
                 <b className="ms-1 text-xl sm:text-2xl text-blue-800">{product?.rating}</b> trên 5
                     <div className="flex items-center gap-1">
                         <StarRating />
                      </div>
             </div>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">All</button>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">5 Start</button>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">4 Start</button>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">2 Start</button>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">3 Start</button>
                 <button className="btn-third text-lg text-center bg-white rounded-md ml-2 px-2">1 Start</button>
          </div>
             {/*  */}
             <div className="p-4 rounded-md shadow-sm bg-white mt-2">
                 <b>Nguyễn Đặng Nam</b>
                 <div className="flex items-center gap-1">
                     <StarRating />
                 </div>
                 <div>
                     Bình luận
                 </div>
             </div>
             <div className="p-4 rounded-md shadow-sm bg-white  mt-2">
                <b>Hương Zang</b>
                 <div className="flex items-center gap-1">
                     <StarRating />
                 </div>
                 <div>
                     Bình luận
                 </div>
           </div>
            
         </section>

        <br />
        <div className="w-full flex justify-center overflow-hidden ">
          <>

          <Similar currentProductCategory={product?.category} />
          </>
        </div>

        
    </div>

      
  );
};

export default ProductDetails;
