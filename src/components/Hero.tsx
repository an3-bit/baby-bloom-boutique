import { Link } from "react-router-dom";
import baby1 from "@/assets/baby1.jfif";
import baby2 from "@/assets/baby2.jfif";
import baby3 from "@/assets/baby3.jfif";

const overlayGradient =
  "from-black/70 via-black/30 to-transparent";
const gradientHeading = "bg-gradient-to-r from-black via-black/90 to-rose-500 bg-clip-text text-transparent";

export default function Hero() {
  return (
    <section className="bg-[#eef6f8]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-5">
          {/* Main hero card */}
          <article className="relative rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.25)] min-h-[440px] md:min-h-[500px] bg-card">
            <img
              src={baby2}
              alt="Baby shower towels and products"
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
            <div className={`absolute inset-0 ${overlayGradient}`}></div>
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
              <span className="text-sm uppercase tracking-[0.2em] text-black/70 font-semibold">
                Baby Shower Pack
              </span>
              <h1 className={`font-display text-4xl md:text-5xl font-bold leading-tight mt-3 ${gradientHeading}`}>
                Sweet Me'
              </h1>
              <p className="max-w-xl text-base text-black/70 mt-4">
                The best safe baby showering products you can find
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full bg-primary text-black text-sm font-semibold shadow-lg shadow-primary/40 transition hover:-translate-y-0.5"
              >
                Browse Products
              </Link>
            </div>
          </article>

          {/* Right stack cards */}
          <div className="flex flex-col gap-5">
            <article className="relative rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.15)] min-h-[200px] md:min-h-[200px] bg-white">
              <img
                src={baby1}
                alt="Baby stroller essentials"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
              <div className="relative z-10 p-6 md:p-7">
                <span className="text-xs uppercase tracking-[0.3em] text-black/70 font-semibold">
                  Baby Strollers
                </span>
                <h2 className={`font-display text-2xl font-bold mt-3 ${gradientHeading}`}>Chick me</h2>
              </div>
            </article>

            <article className="relative rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.15)] min-h-[200px] md:min-h-[220px] bg-white">
              <img
                src={baby3}
                alt="Baby stroller in pastel setting"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
              <div className="relative z-10 p-6 md:p-7">
                <span className="text-xs uppercase tracking-[0.3em] text-black/70 font-semibold">
                  Baby Care Products
                </span>
                <h2 className={`font-display text-2xl font-bold mt-3 ${gradientHeading}`}>Baby Love</h2>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
