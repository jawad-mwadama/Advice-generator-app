import { useEffect, useState } from "react";

import desktopDivider from "../assets/images/pattern-divider-desktop.svg";
import mobileDivider from "../assets/images/pattern-divider-mobile.svg";
import diceIcon from "../assets/images/icon-dice.svg";
import Loader from "../Ui/Loader";
import Error from "../Ui/Error";

function AdviceCard() {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // create function outside then call it in effect
  async function fetchAdvice() {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Failed to fetch random Advice");
      }
      const data = await res.json();

      setAdvice(data.slip);
      setError(null);
    } catch (e) {
      setError(e.message);
      setAdvice("");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <main className="relative mx-3 max-w-sm rounded-2xl bg-slate-600 p-7 text-center shadow-[0_10px_15px_-3px_hsl(218,23%,16%)] sm:mx-4 sm:max-w-md md:mx-4.5">
          <h6 className="text-sm font-medium tracking-widest text-emerald-300 uppercase">
            Advice #{advice.id}
          </h6>

          <div className="">
            <h6 className="py-3 text-2xl font-bold text-sky-100">
              {isLoading ? <Loader /> : `"${advice?.advice}"`}
            </h6>

            {/* desktop */}
            <img
              className="hidden items-center justify-center pt-2 pb-2 md:flex"
              src={desktopDivider}
              alt="desktop divivder"
            />

            {/* mobile */}
            <img
              className="block items-center justify-center pt-2 pb-2 md:hidden"
              src={mobileDivider}
              alt="desktop divivder"
            />
          </div>

          <div
            className="absolute -bottom-5 left-1/2 mt-2 flex -translate-x-1/2 items-center justify-center rounded-full bg-emerald-300 transition-shadow duration-300 hover:bg-emerald-400 hover:shadow-[0_0_20px_4px_theme('colors.emerald.400')] sm:-bottom-6 md:-bottom-6"
            onClick={fetchAdvice}
            disabled={isLoading}
          >
            <img className="p-2" src={diceIcon} alt="Dice Icon" />
          </div>
        </main>
      )}
    </>
  );
}

export default AdviceCard;
