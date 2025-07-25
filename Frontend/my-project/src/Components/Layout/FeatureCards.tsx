
// src/components/FeatureCards.tsx
import React from "react";
import { translations } from "../../locales";
import type { LanguageCode } from "../../locales";
import { FaUniversity, FaCheckCircle, FaPiggyBank, FaHeartbeat } from "react-icons/fa";

const featureLinks = {
  microloan: "/form",
  openAccount: "https://pmjdy.gov.in/account",
  checkEligibility: "https://www.myscheme.gov.in/",
  trackHealth: "https://investor.sebi.gov.in/financial_health_check.html",
};

type Props = {
  lang: LanguageCode;
};

export const FeatureCards: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      title: t.microloan,
      description: t.microloanDesc,
      bg: "bg-blue-100 dark:bg-blue-900",
      href: featureLinks.microloan,
      icon: <FaPiggyBank className="text-2xl mx-auto mb-2 text-blue-600 dark:text-blue-300" />,
    },
    {
      title: t.openAccount,
      description: t.openAccountDesc,
      bg: "bg-green-100 dark:bg-green-900",
      href: featureLinks.openAccount,
      icon: <FaUniversity className="text-2xl mx-auto mb-2 text-green-700 dark:text-green-300" />,
    },
    {
      title: t.checkEligibility,
      description: t.checkEligibilityDesc,
      bg: "bg-purple-100 dark:bg-purple-900",
      href: featureLinks.checkEligibility,
      icon: <FaCheckCircle className="text-2xl mx-auto mb-2 text-purple-700 dark:text-purple-300" />,
    },
    {
      title: t.trackHealth,
      description: t.trackHealthDesc,
      bg: "bg-yellow-100 dark:bg-yellow-800",
      href: featureLinks.trackHealth,
      icon: <FaHeartbeat className="text-2xl mx-auto mb-2 text-yellow-600 dark:text-yellow-300" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4">
      {features.map((feature, idx) => (
        <a
          key={idx}
          href={feature.href}
          target={feature.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`${feature.bg} rounded-xl p-4 text-center shadow hover:scale-105 transition block`}
        >
          {feature.icon}
          <h3 className="font-semibold mb-1">{feature.title}</h3>
          <p className="text-sm">{feature.description}</p>
        </a>
      ))}
    </div>
  );
};
