import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question,
            feedback, or just want to say hello, our team is ready to help.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
                <FaPhone className="text-blue-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 7038142214</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
                <FaEnvelope className="text-blue-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">
                    kamblesagar@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
                <FaMapMarkerAlt className="text-blue-600 text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    Navi Mumbai, Maharashtra, India - 400701
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Send a Message
            </h2>

            <form className="space-y-5">

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;