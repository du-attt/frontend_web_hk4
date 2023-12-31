import { BsArrowDownRightCircle } from "react-icons/bs";

import bannerImg from "../../assets/1.jpg";
import { useNavigate } from "react-router";

const Banner = ({ catRef }) => {
  const navigate = useNavigate();

  return (
    <main className=" flex justify-between items-center py-1 mb-5  relative">
      <section className="max-w-xl mx-auto sm:mx-0  w-full py-2  lg:w-1/3">
        <h1 className="text-6xl  sm:text-7xl lg:text-8xl font-semibold  py-3 w-full ">
          Glasses & Lens
        </h1>
        <p className="py-3 text-md  text-gray-600">
          Mua hàng với chất lượng tốt nhất từ chúng tôi.
          <br />
          Với hơn 100 các phân loại sản phẩm khác nhau.
        </p>
        <section className="flex items-center">
          <button
            className="btn-primary text-sm md:text-base"
            onClick={() => navigate("/products")}
          >
            Bắt đầu mua sắm thôi nào
          </button>
          <button
            className="p-3 flex items-center"
            onClick={() =>
              catRef.current.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span className="mx-2 text-sm md:text-base">Khám phá thêm</span>{" "}
            <BsArrowDownRightCircle className="text-lg" />
          </button>
        </section>
      </section>
      <section className="hidden w-1/2 lg:flex justify-end">
        <img src={bannerImg} alt="bannerImg" className="w-2/3 h-full" />
      </section>
    </main>
  );
};

export default Banner;
