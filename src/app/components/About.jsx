export default function About() {
  return (
    <section className="relative bg-white text-black py-20 px-6 text-center overflow-hidden">
      {/* 🔵 Background logo watermark */}
      <img
        src="/videos/123.png"
        alt="The263Fx Logo"
        className="absolute inset-0 opacity-5 w-full h-full object-contain pointer-events-none select-none"
      />

      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-6">Who Am I? The263Fx</h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          I’m James. Over 7 years of trading, I’ve mentored 2,000+ traders and helped generate $24 million+ in student profits.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8">
          <Stat label="$24M+" value="Student Success" />
          <Stat label="2,000+" value="Global Traders" />
          <Stat label="$6.5M+" value="Verified Profits" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-100 p-6 rounded shadow-md">
      <h3 className="text-3xl font-bold text-blue-600">{label}</h3>
      <p className="mt-2 text-gray-700">{value}</p>
    </div>
  );
}
