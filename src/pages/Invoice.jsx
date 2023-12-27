import { AiOutlineClose } from "react-icons/ai";
import emptyBag from "../assets/empty-shopping-bag.png";
import { useState, useEffect } from "react";


function Invoice({showInvoice, setShowInvoice,InvoiceDetailLists,InvoiceItem}) {
    const [totalQty, setTotalQty] = useState(0);

    useEffect(() => {
        let qty = 0;
        if (InvoiceDetailLists && InvoiceDetailLists.length > 0) {
        InvoiceDetailLists.forEach((invoiceDetail) => {
            qty += invoiceDetail.qty;
        });
        }
        setTotalQty(qty);
    }, [InvoiceDetailLists]);
    return (
        <> 
        <div className="transition justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-lg">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-96">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Chi tiết hóa đơn</h3>
                  <button className="p-1" onClick={() => setShowInvoice(false)}>
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-96">
                    <div className="flex flex-col gap-2 w-full p-3">
                        <span className="flex justify-between"><p>Số lượng sản phẩm: </p>{totalQty}</span>
                        <span className="flex justify-between"><p>Giá gốc: </p>{InvoiceItem.totalAmount}VNĐ</span>
                        <span className="flex justify-between"><p>Giá phải trả: </p>{InvoiceItem.grandTotal}VNĐ</span>
                        <span className="flex justify-between"><p>Phương thức thanh toán: </p>{InvoiceItem.paymentMethod}</span>
                        <span className="flex justify-between"><p>Ngày tạo: </p>{InvoiceItem.issueDate}</span>
                    </div>
                    <span className="p-3">Chi tiết sản phẩm</span>
                    {InvoiceDetailLists && InvoiceDetailLists.length > 0 ? (
                        InvoiceDetailLists.map((invoiceDetail) => (
                            
                            <div className="flex items-center flex-wrap gap-2 w-full p-3" key={invoiceDetail?.id}>
                                
                                <div className="flex items-center flex-wrap gap-2 w-full bg-gray-100 shadow-md">
                                    <div className="flex flex-wrap xs:flex-nowrap justify-center xs:justify-start flex-1 items-center gap-5 p-3">
                                        <div className={` bg-black/[0.075] rounded-md flex items-center`}>
                                            <img src={invoiceDetail?.image} alt="" className="object-fit " width={60}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-xl font-semibold">{invoiceDetail?.name}</h2>
                                            <span className="text-gray-700">Số lượng: {invoiceDetail?.qty}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end p-3">
                                        <span>{invoiceDetail?.newPrice}VNĐ</span>
                                        <span className="text-xs line-through text-gray-600">{invoiceDetail?.price}VNĐ</span>
                                    </div>

                                </div>
                            </div>
                    ))
                    ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> 
     );
}

export default Invoice;