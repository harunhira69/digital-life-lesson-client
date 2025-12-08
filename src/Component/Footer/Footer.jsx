import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = ({ darkMode }) => {
  const bgClass = darkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-gray-800";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200";

  return (
    <footer className={`${bgClass} pt-12`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-10">

        {/* Logo & Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-primary">DigitalLifeLessons</span>
          </div>
          <p className="text-gray-500 text-sm">
            Empowering learners worldwide with meaningful lessons and personal growth insights.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/harun.sarkar.7946/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/harunabhi4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition text-lg"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/harunhira69"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 dark:hover:text-white transition text-lg"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/harunmern/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition text-lg"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Email: support@digitallifelessons.com</li>
            <li>Phone: +880 1794-908771</li>
            <li>Address: Bogura, Bangladesh</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-primary transition">Support</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter / Call to Action */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Stay Updated</h3>
          <p className="text-gray-500 text-sm mb-3">
            Subscribe to get the latest lessons, tips, and updates.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className={`mt-10 border-t ${borderClass} py-4 text-center text-gray-500 text-sm`}>
        &copy; {new Date().getFullYear()} DigitalLifeLessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
