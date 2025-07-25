import React from "react";
import { BookOpen, Globe, MessageSquare } from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="w-full px-4 py-12 max-w-screen-xl mx-auto text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-400 mb-6">
        Empowering Through Financial Inclusion
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-base md:text-lg">
        We aim to make finance accessible to everyone — regardless of background,
        language, or location.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Financial Literacy */}
        <div className="bg-white dark:bg-gray-900 shadow-md dark:shadow-xl rounded-xl p-6 transition-transform hover:scale-105">
          <BookOpen className="text-blue-600 dark:text-blue-300 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Financial Literacy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Simple visual explanations to understand savings, credit, and banking.
          </p>
        </div>

        {/* Language Inclusivity */}
        <div className="bg-white dark:bg-gray-900 shadow-md dark:shadow-xl rounded-xl p-6 transition-transform hover:scale-105">
          <MessageSquare className="text-blue-600 dark:text-blue-300 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Language Inclusivity</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Information presented in native languages for better understanding.
          </p>
        </div>

        {/* Rural Outreach */}
        <div className="bg-white dark:bg-gray-900 shadow-md dark:shadow-xl rounded-xl p-6 transition-transform hover:scale-105">
          <Globe className="text-blue-600 dark:text-blue-300 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Rural Outreach</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Reaching remote areas through mobile camps and digital awareness.
          </p>
        </div>
      </div>
    </div>
  );
};
