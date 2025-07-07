export default function About() {
  return (
    <section className="relative bg-white text-black py-20 px-6 overflow-hidden">
      {/* 🔵 Background watermark logo */}
      <img
        src="/videos/123.png"
        alt="The263Fx Logo"
        className="absolute inset-0 opacity-5 w-full h-full object-contain pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        {/* 📸 Profile Image Placeholder */}
        <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-full overflow-hidden shadow-lg">
          <img
            src="/videos/ronald-placeholder.jpg" // Replace with actual image when available
            alt="Ronald - The263Fx"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🧠 Bio Text */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Who Am I? The263Fx</h2>
          <p className="max-w-xl text-lg leading-relaxed">
            Hey there, folks! I'm Ronald from The263Fx and I've been around the forex trading block since February 2020.
            I've seen the ups and downs of this industry, and I'm here to share some valuable insights, cool podcasts,
            and in-depth market breakdowns to help you out on your own trading journey. Let's aim for success and make
            some impressive strides in the forex world together!
          </p>
        </div>
      </div>
    </section>
  );
}
