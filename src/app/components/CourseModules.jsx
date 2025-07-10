
export default function CourseModules() {
  return (
    <section className="bg-gray-900 py-20 text-center text-white">
      <h2 className="text-4xl font-bold mb-8">What You Will Learn</h2>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {[
          'Why 90% of Traders Lose',
          'How to become a 10% Trader',
          'Build a system that works',
          'Get Funded Accounts',
          'Make consistent withdrawals',
          'Become a role model',
        ].map((item, i) => (
          <div key={i} className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
