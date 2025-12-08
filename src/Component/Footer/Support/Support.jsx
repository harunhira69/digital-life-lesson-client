import React, { useState } from "react";

const Support = ({ darkMode }) => {
  const bgClass = darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const inputClass = darkMode
    ? "bg-gray-800 text-gray-200 border-gray-700 placeholder-gray-400"
    : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call or email sending)
    console.log("Support request submitted:", formData);
    alert("Your support request has been submitted!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className={`${bgClass} min-h-screen py-12 px-6 md:px-12`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-4">
          Contact Support
        </h1>
        <p className={`text-center mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Have a question or issue? Fill out the form below or contact us directly.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Our Contact Info</h2>
            <p>Email: <a href="mailto:support@digitallifelessons.com" className="text-primary underline">support@digitallifelessons.com</a></p>
            <p>Phone: <a href="tel:+8801794908771" className="text-primary underline">+880 1794-908771</a></p>
            <p>Address: Bogura, Bangladesh</p>
          </div>

          {/* Support Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`flex-1 px-4 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`flex-1 px-4 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-primary`}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`w-full px-4 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-primary`}
            />

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
