import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";

import profilePic from "./../assets/profilePic.jpg"

function About() {
  const values = [
    {
      number: "01",
      title: "Curated Selection",
      description:
        "Every product is carefully chosen for quality, design, and everyday value.",
      icon: <FaCheckCircle />,
    },
    {
      number: "02",
      title: "Fast Fulfillment",
      description:
        "From checkout to doorstep, we focus on speed, reliability, and convenience.",
      icon: <FaShippingFast />,
    },
    {
      number: "03",
      title: "Built On Trust",
      description:
        "Secure payments, transparent policies, and support you can rely on.",
      icon: <FaShieldAlt />,
    },
  ];

  return (
    <main className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            About E-Shop
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900">
            Shopping,
            <br />
            Reimagined.
          </h1>

          <p className="max-w-2xl mt-8 text-lg text-slate-500 leading-relaxed">
            Built for people who value simplicity, quality, and trust. We
            believe online shopping should feel effortless, enjoyable, and
            beautifully designed.
          </p>
        </section>

        {/* Philosophy */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Our Philosophy
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-bold text-slate-900">
              We don't sell products.
              <br />
              We curate experiences.
            </h2>

            <p className="mt-8 text-slate-600 text-lg leading-relaxed">
              Every item in our collection is selected with intention. From
              everyday essentials to lifestyle upgrades, our goal is to help
              customers discover products that genuinely improve their daily
              lives.
            </p>
          </div>
        </section>

        {/* Value Cards */}
        <section className="py-10">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.number}
                className="group p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold text-slate-200">
                    {value.number}
                  </span>

                  <div className="text-2xl text-slate-900">{value.icon}</div>
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl md:text-7xl font-bold text-slate-900">
                10K+
              </h3>
              <p className="mt-3 text-slate-500">Customers</p>
            </div>

            <div>
              <h3 className="text-5xl md:text-7xl font-bold text-slate-900">
                500+
              </h3>
              <p className="mt-3 text-slate-500">Products</p>
            </div>

            <div>
              <h3 className="text-5xl md:text-7xl font-bold text-slate-900">
                50+
              </h3>
              <p className="mt-3 text-slate-500">Brands</p>
            </div>

            <div>
              <h3 className="text-5xl md:text-7xl font-bold text-slate-900">
                99%
              </h3>
              <p className="mt-3 text-slate-500">Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Premium Banner */}
        <section className="py-10">
          <div className="bg-slate-900 text-white rounded-[40px] p-10 md:p-16 overflow-hidden relative">
            <div className="max-w-3xl">
              <span className="text-slate-400 uppercase tracking-widest text-sm">
                Beyond Shopping
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-bold">
                More than an
                <br />
                online store.
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                A destination where quality meets convenience. Designed to make
                discovering great products feel effortless.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        {/* Founder Section */}
        <section className="py-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Founder & Developer
            </span>

            <div className="flex justify-center mt-10">
              <img
                src={profilePic}
                alt="Sagar Kamble"
                className="w-29 h-30 rounded-full object-cover"
              />
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
              Sagar Kamble
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Designed and developed entirely by me, combining modern web
              technologies with clean design to create a seamless e-commerce
              experience.
            </p>
            <a
              href="https://sagark.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-slate-900 font-medium hover:underline"
            >
              View Portfolio →
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="bg-white border border-slate-200 shadow-sm rounded-[40px] p-10 md:p-14 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Ready to explore?
            </h2>

            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Discover products designed to meet your needs and elevate your
              everyday experience.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              Shop Now
              <FaArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
