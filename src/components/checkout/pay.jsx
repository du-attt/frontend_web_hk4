import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

import payimg from "../../assets/pay.png";
import VNPay from "../../assets/VNPay.png";
import Momo from "../../assets/momo.png";
import spinningLoader from "../../assets/spinning-circles.svg";
import { notify } from "../../utils/utils";
import { useNavigate } from "react-router";
import { useAuthContext, useCartContext } from "../../contexts";

import { postVNPay, postInvoice, postMomoUrl, getCartItemsService } from "../../api/apiServices";

const Pey = ({showPay, setShowPay}) => {
    const { token } = useAuthContext();
    const { clearCart, totalPriceOfCartProducts } = useCartContext();
    const [disableBtn, setDisableBtn] = useState(false);
    const [checkBtn, setCheckBtn] = useState("pay");
    const navigate = useNavigate();
    const { cart } = useCartContext();

    const clickHandler = (Pay) => {
        setDisableBtn(true);
        setTimeout(() => {
            setDisableBtn(false);
            if(Pay === "pay"){
                // Thanh toán khi nhận hàng
                CreateInvoice(Pay);
                setTimeout(() => {
                    navigate("/");
                    setShowPay(false);
                },1000)

            }else if(Pay === "VNPay"){
                // Thanh toán bằng VNPay
                setShowPay(false);
                displayVNPay();
            } else{
                // Thanh toán bằng Momo
                setShowPay(false);
                displayMomo();

            }
        }, 1000);
      };
      // Chuyển đến trang thanh toán của VNPay
      const displayVNPay = () => {
        (async () => {
            const url = await postVNPay(totalPriceOfCartProducts,token);
            window.open(url.data.paymentUrl);
            }
        )();
        
      };
      const CheckVNpay = () => {
        (async () => {
            try {
              const cartRes = await getCartItemsService(token);
            } catch (err) {
              console.log(err);
            }
        })();
      }
      const displayMomo = () => {
        (async () => {
            const url = await postMomoUrl(token);
            window.open(url.data.paymentUrl);
            }
        )();
      }
      // Tạo hóa đơn 
      const CreateInvoice = (Pay) => {
        (async () => {
          try {
            const response = await postInvoice(Pay,token);
            if (response.status === 200) {
              notify("success", "Đặt hàng thành công");
              clearCart();
            }
          } catch (err) {
            console.log(err);
            notify("error", "Có lỗi xảy ra khi tạo hóa đơn");
          }
        })();
      };
      useEffect(() => {
        CheckVNpay();
      }, [cart]);
    return (  
        <>
            {showPay ? (
                <>
                    <div className="transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full my-6 mx-auto max-w-lg">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                                <h3 className="text-xl font-semibold">Phương thức thanh toán</h3>

                                <button className="p-1" onClick={() => setShowPay(false)}>
                                <AiOutlineClose />
                                </button>
                            </div>
                            <div className="flex items-start flex-col p-5 border-b border-solid border-slate-200 rounded-t">
                                <button 
                                disabled={disableBtn}
                                
                                className="flex items-center cursor-pointer mb-5 w-full shadow-md rounded-md h-10 hover:scale-[1.02] hover:shadow-lg"
                                onClick={() => {
                                    const Pay = "pay";
                                    clickHandler(Pay);
                                    setCheckBtn("pay");
                                }}
                                >
                                    <img
                                        className="rounded-md me-3 ml-2"
                                        src={payimg}
                                        alt="userProfileImage"
                                        width={25}
                                    />
                                    {disableBtn && checkBtn ==="pay" ? (
                                        <>
                                        <span className="text-xl font-semibold">Thanh toán khi nhận hàng</span>
                                        <img 
                                        className="filter brightness-0 ml-auto mr-2"
                                        src={spinningLoader} 
                                        alt="" height={20} />

                                        </>
                                    ):(
                                        <span className="text-xl font-semibold">Thanh toán khi nhận hàng</span>
                                    )}
                                </button>
                                <button 
                                disabled={disableBtn}
                                className="flex items-center cursor-pointer mb-5 w-full shadow-md rounded-md h-10 hover:scale-[1.02] hover:shadow-lg"
                                onClick={() => {
                                    const Pay = "VNPay";
                                    clickHandler(Pay);
                                    setCheckBtn("VNPay");
                                }}
                                >
                                    <img
                                        className="rounded-md me-3 ml-2"
                                        src={VNPay}
                                        alt="userProfileImage"
                                        width={25}
                                    />
                                    {disableBtn && checkBtn === "VNPay" ?(
                                        <>
                                        <span className="text-xl font-semibold">VNPay</span>
                                        <img 
                                        className="filter brightness-0 ml-auto mr-2"
                                        src={spinningLoader} 
                                        alt="" height={20} />

                                        </>
                                    ):(
                                        <span className="text-xl font-semibold">VNPay</span>
                                    )}
                                </button>

                                <button 
                                disabled={disableBtn}
                                
                                className="flex items-center cursor-pointer mb-5 w-full shadow-md rounded-md h-10 hover:scale-[1.02] hover:shadow-lg"
                                onClick={() => {
                                    const Pay = "Momo";
                                    clickHandler(Pay);
                                    setCheckBtn("Momo");
                                }}
                                >
                                    <img
                                        className="rounded-md me-3 ml-2"
                                        src={Momo}
                                        alt="userProfileImage"
                                        width={25}
                                    />
                                    {disableBtn && checkBtn === "Momo" ? (
                                        <>
                                        <span className="text-xl font-semibold">Momo</span>
                                        <img 
                                        className="filter brightness-0 ml-auto mr-2"
                                        src={spinningLoader} 
                                        alt="" height={20} />

                                        </>
                                    ):(
                                        <span className="text-xl font-semibold">Momo</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ): null }
         </>
    );
};
export default Pey;