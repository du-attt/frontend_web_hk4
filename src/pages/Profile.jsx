import { useState, useEffect } from "react";

import { useAuthContext, useProductsContext } from "../contexts";

import { AddressCard, AddressForm } from "../components";
import Address from "../components/address/Address";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { getInvoice, getInvoiceDetail } from "../api/apiServices";
import { notify } from "../utils/utils";
import Invoice from "./Invoice";

const Profile = () => {
  const userDetails = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const { addressList } = useProductsContext();
  const [selectedItem, setSelectedItem] = useState("profile");
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { token } = useAuthContext();
  const { logoutHandler } = useAuthContext();
  const [showInvoice, setShowInvoice] = useState(false);
  const handleLogOut = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logoutHandler();
      setLoggingOut(false);
    }, 1000);
  };
  const [InvoiceLists, setInvoiceList] = useState([]);
  const [InvoiceDetailLists, setInvoiceDetailList] = useState([]);
  const [InvoiceItem, setInvoiceItem] = useState([]);
  const handleGetInvoice = async () => {
    try {
      const Invoices = await getInvoice(token);
      setInvoiceList(Invoices.data.invoice);
    } catch (err) {
      console.log(err);
      notify("error", "Có lỗi xảy ra");
    }
  };
  const clickHandle = (invoiceId) => {
    setShowInvoice(true);
    handleGetInvoiceDetail(invoiceId);
    selectInvoiceItem(invoiceId);
  };
  const handleGetInvoiceDetail = async (invoiceId) => {
    try {
      const InvoiceDetails = await getInvoiceDetail(invoiceId, token);
      setInvoiceDetailList(InvoiceDetails.data.items);
    } catch (error) {
      notify("error", "Có lỗi xảy ra");
    }
  };
  const selectInvoiceItem = (invoiceId) => {
    InvoiceLists.map((invoice) => {
      if(invoice?.id === invoiceId){
        setInvoiceItem(invoice);
      }
    })
  }

  useEffect(() => {
    handleGetInvoice();
  },[]);





  return (
    <div className="min-h-[80vh] min-w-md max-w-2xl m-auto mt-10">
      <section className="h-full p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full">
        <div className="flex">
          <button
            className={`flex-1 text-sm  ${
              selectedItem === "profile"
                ? "bg-[--primary-text-color] text-white"
                : "bg-gray-100"
            } p-3 shadow-sm transition-colors `}
            onClick={() => setSelectedItem("profile")}
          >
            Hồ sơ cá nhân
          </button>
          <button
            onClick={() => setSelectedItem("address")}
            className={`flex-1 text-sm  ${
              selectedItem === "address"
                ? "bg-[--primary-text-color] text-white"
                : "bg-gray-100"
            } p-3 shadow-sm transition-colors `}
          >
            Địa chỉ nhận hàng
          </button>
          <button
            onClick={() => setSelectedItem("invoice")}
            className={`flex-1 text-sm  ${
              selectedItem === "invoice"
                ? "bg-[--primary-text-color] text-white"
                : "bg-gray-100"
            } p-3 shadow-sm transition-colors `}
          >
            Lịch sử mua hàng
          </button>
        </div>
        {selectedItem === "profile" ? (
          <div className="flex flex-col gap-4 w-full p-5">
            <p>
              <span className="text-gray-600 me-1">Họ tên:</span>
              <span className="break-all">{userDetails?.name}</span>
            </p>
            <p>
              {" "}
              <span className="text-gray-600 me-1">Email:</span>{" "}
              <span className="break-all">{userDetails?.email ?? ""}</span>
            </p>
            <hr />
            <button
              disabled={loggingOut}
              className="w-1/2 text-sm bg-rose-600 py-2 px-4 text-white rounded-md hover:bg-rose-700"
              onClick={handleLogOut}
            >
              {loggingOut ? "Logging Out..." : "Logout"}
            </button>
          </div>
        ) : selectedItem === "invoice" ? (
          <div className="flex flex-col gap-4 w-full p-5">
            {InvoiceLists.length > 0 ? (
              InvoiceLists.map((invoice) => (
                <button key={invoice.id} className="flex items-center cursor-pointer mb-5 w-full shadow-md rounded-md h-20 hover:scale-[1.02] hover:shadow-lg p-2 bg-gray-100"
                 onClick={() => clickHandle(invoice?.id)}>

                  <div className="flex flex-col w-full">
                    <div className="flex flex-col items-start justify-between w-full">
                      <p className="flex items-center w-full justify-between pb-3">
                        <span className="text-green-500">Hóa đơn: #{invoice?.id}</span>
                        {invoice?.paymentMethod === "Thanh toán khi nhận hàng" ? (
                          <span className="text-red-500"><AiFillCloseCircle /></span>
                        ) : (
                          <span className="text-green-500"><AiFillCheckCircle /></span>
                        )}
                      </p>
                      <div className="flex items-center w-full justify-between">
                        <p className="flex flex-col items-start">
                          <span>Giá gốc: {invoice?.totalAmount}VNĐ</span>
                          <span>Giá: {invoice?.grandTotal}VNĐ</span>
                        </p>
                        <p className="flex flex-col items-start">
                          <span>Hình thức: {invoice?.paymentMethod}</span>
                          <span>Ngày mua: {invoice?.issueDate}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="flex flex-col items-center ">Không có hóa đơn nào.</p>
            )}
            {showInvoice ? (<>
              <Invoice showInvoice={showInvoice} setShowInvoice={setShowInvoice} InvoiceDetailLists={InvoiceDetailLists} InvoiceItem={InvoiceItem}/>
            </>
            ):null}
          </div>
          

        ) : (
          <section className=" rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            <Address isEdit />
          </section>
        )}
      </section>
    </div>
  );
};

export default Profile;
