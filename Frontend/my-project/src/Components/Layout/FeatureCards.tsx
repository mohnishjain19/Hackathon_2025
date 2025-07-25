// src/components/FeatureCards.tsx
import React from "react";
import { translations } from "../../locales";
import type { LanguageCode } from "../../locales";


type Props = {
  lang: LanguageCode;
};

export const FeatureCards: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      title: t.microloan,
      description: t.microloanDesc,
      bg: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: t.openAccount,
      description: t.openAccountDesc,
      bg: "bg-green-100 dark:bg-green-900"
    },
    {
      title: t.checkEligibility,
      description: t.checkEligibilityDesc,
      bg: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: t.trackHealth,
      description: t.trackHealthDesc,
      bg: "bg-yellow-100 dark:bg-yellow-800"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`${feature.bg} rounded-xl p-4 text-center shadow hover:scale-105 transition`}
        >
          <h3 className="font-semibold mb-1">{feature.title}</h3>
          <p className="text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
