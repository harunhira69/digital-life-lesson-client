import React from "react";

const Terms = ({ darkMode }) => {
  const bgClass = darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const headingClass = darkMode ? "text-white" : "text-gray-900";
  const textClass = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <div className={`${bgClass} min-h-screen py-12 px-6 md:px-12`}>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Page Heading */}
        <h1 className={`text-3xl font-bold ${headingClass}`}>Terms & Conditions</h1>

        {/* Introduction */}
        <section className="space-y-4">
          <p className={textClass}>
            Welcome to DigitalLifeLessons! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <p className={textClass}>
            Please read these terms carefully. If you do not agree with any part of these terms, you must not use our website or services.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>User Responsibilities</h2>
          <ul className={`list-disc list-inside space-y-1 ${textClass}`}>
            <li>Users must provide accurate information when registering.</li>
            <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
            <li>Users must respect other members and refrain from posting harmful or offensive content.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>Intellectual Property</h2>
          <p className={textClass}>
            All content, including lessons, images, logos, and software, is owned by DigitalLifeLessons or its content providers and is protected by copyright and intellectual property laws.
          </p>
        </section>

        {/* Payment & Premium Features */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>Payment & Premium Features</h2>
          <p className={textClass}>
            For paid features or premium plans, users must comply with the payment terms. All payments are processed securely via our payment gateway. Access to premium content is granted upon successful payment.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>Limitation of Liability</h2>
          <p className={textClass}>
            DigitalLifeLessons is not responsible for any damages resulting from the use or inability to use our website or services. Use our platform at your own risk.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>Changes to Terms</h2>
          <p className={textClass}>
            We reserve the right to modify these Terms & Conditions at any time. Updated terms will be posted on this page, and continued use of the website constitutes acceptance of the changes.
          </p>
        </section>

        {/* Contact Info */}
        <section className="space-y-2">
          <h2 className={`text-2xl font-semibold ${headingClass}`}>Contact</h2>
          <p className={textClass}>
            If you have any questions about these terms, please contact us at support@digitallifelessons.com.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Terms;
