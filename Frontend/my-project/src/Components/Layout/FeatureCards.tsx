

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4">
      <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 text-center shadow hover:scale-105 transition">
        <h3 className="font-semibold mb-1">Apply for Microloan</h3>
        <p className="text-sm">Kickstart your journey to financial independence.</p>
      </div>
      <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 text-center shadow hover:scale-105 transition">
        <h3 className="font-semibold mb-1">Open Digital Bank Account</h3>
        <p className="text-sm">Secure and easy banking at your fingertips.</p>
      </div>
      <div className="bg-purple-100 dark:bg-purple-900 rounded-xl p-4 text-center shadow hover:scale-105 transition">
        <h3 className="font-semibold mb-1">Check Scheme Eligibility</h3>
        <p className="text-sm">Find government schemes that fit your needs.</p>
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-800 rounded-xl p-4 text-center shadow hover:scale-105 transition">
        <h3 className="font-semibold mb-1">Track Financial Health</h3>
        <p className="text-sm">Visualize savings, loans, and credit in one place.</p>
      </div>
    </div>
  );
};
