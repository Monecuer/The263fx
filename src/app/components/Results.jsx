
export default function Results() {
  return (
    <section className="bg-gray-800 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-8">Real Student Results</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {[
          "$200K Funded Account",
          "$50K Profit in 3 Months",
          "Full-Time Career Change",
          "Trading from Anywhere",
          "$10K in 2 Weeks",
          "Scaled to $500K AUM"
        ].map((result, idx) => (
          <div key={idx} className="bg-gray-700 p-6 rounded-lg shadow-lg">
            {result}
          </div>
        ))}
      </div>
    </section>
  );
}
