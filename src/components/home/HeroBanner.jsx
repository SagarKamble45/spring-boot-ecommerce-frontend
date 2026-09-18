import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { bannerLists } from "../../utils";

const HeroBanner = () => {
  return (
    <div className="py-4">
      <Swiper
        slidesPerView={1}
        loop
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {bannerLists.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-50 via-white to-blue-50 shadow-sm border border-gray-100">

              <div className="grid lg:grid-cols-2 items-center min-h-125 px-6 lg:px-16">

                {/* Left Content */}
                <div className="order-2 lg:order-1 text-center lg:text-left py-10">

                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                    ✨ New Collection
                  </span>

                  <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                    {item.title}
                  </h1>

                  <h2 className="mt-3 text-xl lg:text-2xl font-semibold text-blue-600">
                    {item.subtitle}
                  </h2>

                  <p className="mt-5 text-gray-600 max-w-lg mx-auto lg:mx-0">
                    {item.description}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

                    <Link
                      to="/products"
                      className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      Shop Now
                    </Link>

                    <Link
                      to="/products"
                      className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition"
                    >
                      View Collection
                    </Link>

                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10">

                    <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
                      <span className="text-blue-600 font-semibold">
                        Free Delivery
                      </span>
                    </div>

                    <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
                      <span className="text-blue-600 font-semibold">
                        Easy Returns
                      </span>
                    </div>

                    <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
                      <span className="text-blue-600 font-semibold">
                        Best Quality
                      </span>
                    </div>

                  </div>

                </div>

                {/* Right Image */}
                <div className="order-1 lg:order-2 flex justify-center items-center p-6">

                  <div className="relative">

                    {/* Decorative Circle */}
                    {/* <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl scale-110"></div> */}

                    <img src={item.image} alt={item.title} className=' w-full max-w-125 object-contain transition duration-500 hover:scale-105'
                    />

                  </div>

                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;