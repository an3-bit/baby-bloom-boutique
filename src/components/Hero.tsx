import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import baby10 from "@/assets/baby10.jfif";
import baby11 from "@/assets/baby11.jfif";
import baby4 from "@/assets/baby4.jpg";
import baby5 from "@/assets/baby5.jfif";
import baby6 from "@/assets/baby6.jfif";
import baby7 from "@/assets/baby7.jfif";
import baby8 from "@/assets/baby8.jfif";
import baby9 from "@/assets/baby9.jfif";

const overlayGradient = "from-black/60 via-black/30 to-transparent";
const gradientHeading = "bg-gradient-to-r from-[#ff8fbf] via-[#ff5c8d] to-[#ff2e5b] bg-clip-text text-transparent";

const mainHeroImages = [baby7, baby8, baby9];
const topRightImages = [baby4, baby5, baby6];
const bottomRightImages = [baby10, baby11];

export default function Hero() {
  const [mainIdx, setMainIdx] = useState(0);
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIdx((prev) => (prev + 1) % mainHeroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTopIdx((prev) => (prev + 1) % topRightImages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBottomIdx((prev) => (prev + 1) % bottomRightImages.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const mainImage = mainHeroImages[mainIdx];
  const topImage = topRightImages[topIdx];
  const bottomImage = bottomRightImages[bottomIdx];

  return (
    <section className="bg-[#eef6f8]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-5">
          {/* Main hero card */}
          <article className="relative rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(15,23,42,0.25)] min-h-[440px] md:min-h-[500px] bg-card">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt="Baby shower essentials"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
            </AnimatePresence>
            <div className={`absolute inset-0 ${overlayGradient}`}></div>
            <div className="relative z-10 flex flex-col justify-end items-end text-right h-full p-8 md:p-10">
              <span className="text-sm uppercase tracking-[0.2em] text-black font-semibold">
                Baby Shower Pack
              </span>
              <h1 className={`font-display text-4xl md:text-5xl font-bold leading-tight mt-3 ${gradientHeading}`}>
                Sweet Me'
              </h1>
              <p className="max-w-xl text-base text-black mt-4">
                The best safe baby showering products you can find
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/40 transition hover:-translate-y-0.5"
              >
                Browse Products
              </Link>
            </div>
          </article>

          {/* Right stack cards */}
          <div className="flex flex-col gap-5">
            <article className="relative rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.15)] min-h-[200px] md:min-h-[200px] bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={topImage}
                  src={topImage}
                  alt="Baby stroller essentials"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
              <div className="relative z-10 p-6 md:p-7 flex flex-col items-start text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold">
                  Baby Strollers
                </span>
                <h2 className={`font-display text-2xl font-bold mt-3 ${gradientHeading}`}>Chick me</h2>
              </div>
            </article>

            <article className="relative rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.15)] min-h-[200px] md:min-h-[220px] bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={bottomImage}
                  src={bottomImage}
                  alt="Baby stroller in pastel setting"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
              <div className="relative z-10 p-6 md:p-7 flex flex-col items-start text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold">
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
