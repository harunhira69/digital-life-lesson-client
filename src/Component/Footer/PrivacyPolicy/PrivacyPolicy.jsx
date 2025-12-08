import React, { useState } from "react";

const PrivacyPolicy = ({ darkMode }) => {
  const bgClass = darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const headingClass = darkMode ? "text-white" : "text-gray-900";
  const textClass = darkMode ? "text-gray-300" : "text-gray-700";

  // Accordion state
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Introduction",
      content: `DigitalLifeLessons is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website and services.`
    },
    {
      title: "Information Collection",
      content: `We collect personal information such as name, email, account details, and any content you provide when using our services. We may also collect usage data and cookies to improve our platform.`
    },
    {
      title: "Use of Information",
      content: `Your information is used to provide, maintain, and improve our services, communicate with you, process payments, and personalize your experience. We do not sell your personal data to third parties.`
    },
    {
      title: "Data Security",
      content: `We implement industry-standard security measures to protect your information. However, no system is 100% secure, and we cannot guarantee absolute security of your data.`
    },
    {
      title: "Third-Party Services",
      content: `We may use third-party services like Stripe for payments, Google Analytics for tracking, and other tools to provide our services. These services have their own privacy policies.`
    },
    {
      title: "Cookies & Tracking",
      content: `Cookies help enhance your experience. You can manage cookie preferences in your browser. We use cookies for analytics, preferences, and basic functionality.`
    },
    {
      title: "Your Rights",
      content: `You can access, update, or delete your personal information by contacting us. You can also opt out of communications and certain tracking mechanisms.`
    },
    {
      title: "Changes to Privacy Policy",
      content: `We may update this privacy policy periodically. Updated policies will be posted here. Continued use of our website constitutes acceptance of the new policy.`
    },
    {
      title: "Contact",
      content: `For questions or concerns about this privacy policy, please contact us at support@digitallifelessons.com.`
    },
  ];

  return (
    <div className={`${bgClass} min-h-screen py-12 px-6 md:px-12`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className={`text-3xl font-bold ${headingClass}`}>Privacy Policy</h1>

        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-300 dark:border-gray-700">
            <button
              className={`w-full text-left py-4 flex justify-between items-center font-semibold text-lg ${headingClass} focus:outline-none`}
              onClick={() => toggleAccordion(index)}
            >
              {section.title}
              <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className={`py-2 text-sm ${textClass}`}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
