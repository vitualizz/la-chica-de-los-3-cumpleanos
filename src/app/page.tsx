"use client";

import { useGetCharacter } from "@/hooks/useCharacter";
import { LetterDates, Letters } from "../constants/LetterDates";
import LetterLink from "@/components/LetterLink";
import { LetterOptionals } from "@/constants/LetterOptionals";
import Link from "next/link";
import { useEmail } from "@/hooks/useEmail";
import FlowersBluePage from "@/components/FlowerBluePage";
import { isMobile } from "react-device-detect";

export default function Home() {
  const kuromi = useGetCharacter("kuromi");
  const helloKitty = useGetCharacter("hello-kitty");
  const { sendEmail } = useEmail();

  const handleFlowersClick = () => {
    sendEmail("Recibió las flores");
  };

  if (true) return <FlowersBluePage isMobileDevice={isMobile} />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-20 animate-in slide-in-from-top-4 duration-1000">
        {/* Floating characters */}
        <div
          className="absolute top-6 md:top-20 left-10 text-6xl opacity-10 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          {helloKitty}
        </div>
        <div
          className="absolute top-6 md:top-32 right-5 md:right-16 text-5xl opacity-10 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          {kuromi}
        </div>
        {/* <div */}
        {/*   className="absolute top-52 md:top-40 left-40 md:left-1/4 text-4xl opacity-80 md:opacity-10 animate-bounce" */}
        {/*   style={{ animationDelay: "2s", animationDuration: "5s" }} */}
        {/* > */}
        {/*   💌 */}
        {/* </div> */}

        {/* Sección Halloween - Nueva carta Jawolin */}

        <div className="border-b-2 border-slate-200 mb-10 pb-10 relative">
          <h3>
            ¿Será un buen momento para escribir o será un buen momento para
            leer?
          </h3>
          <h2>¿Smile? 😊</h2>
        </div>

        <div className="border-b-2 border-slate-200 mb-10 pb-10">
          <div className="relative">
            {/* Decoraciones de Halloween */}
            <div
              className="absolute -top-4 -left-4 text-3xl opacity-20 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            >
              🎃
            </div>
            <div
              className="absolute -top-2 -right-6 text-2xl opacity-20 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            >
              👻
            </div>
            <div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl opacity-20 animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "5s" }}
            >
              🦇
            </div>

            <h3 className="mb-6 font-bold text-2xl text-center">
              🎃 Es momento de un poco de terror 🎃
            </h3>
            <p className="mb-6 text-center text-slate-600">
              Ya que estás aquí, solo queria recordarte que me caes al pincho :3
            </p>
            <div className="text-center">
              <Link
                href="/carta-jawolin"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 font-normal px-6 py-3 text-white mt-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>🎃</span>
                Descubrir la Carta Jawolin
                <span>👻</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b-2 border-slate-200 mb-10 pb-10">
          <h3 className="mb-6 font-bold text-2xl">Toma un ramito de flores</h3>
          <p className="mb-6">
            Se que muchas personas te regalaran flores, así que yo te regalo
            unas flores que nacieron a base de matemáticas, código y con mejor
            color. Besitos :b
          </p>
          <Link
            href="/flores-azules"
            className="bg-pink-500 hover:underline font-normal px-5 py-2 text-white mt-4 rounded-lg"
            onClick={handleFlowersClick}
          >
            Recibir
          </Link>
        </div>

        <div className="border-b-2 border-slate-200 mb-10 pb-10">
          <h3 className="text-2xl font-light text-slate-800 mb-20 md:mb-6 leading-tight">
            Ya pasó tu cumpleaños, y ahora que estás aquí, ¿te gustaría leer
            algo más?
          </h3>

          <div className="text-left grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            <LetterLink
              title={LetterOptionals[1].title}
              description={LetterOptionals[1].description}
              href={LetterOptionals[1].href}
              character={LetterOptionals[1].character}
              positionalOptional={1}
            />
            <LetterLink
              title={LetterOptionals[2].title}
              description={LetterOptionals[2].description}
              href={LetterOptionals[2].href}
              character={LetterOptionals[2].character}
              positionalOptional={2}
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-20 md:mb-6 leading-tight">
          La chica de los
          <span className="block text-pink-500 animate-in slide-in-from-right-4 duration-1000 delay-500">
            3 cumpleaños
          </span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-slate-600 leading-relaxed mb-8 animate-in fade-in-0 duration-1000 delay-700">
            "La vida es un viaje de tres notas: la nostalgia que nos acompaña,
            la libertad que buscamos y el amor que nos hace crecer.""
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-8 animate-in slide-in-from-left-4 duration-1000 delay-1000" />

          <p className="text-slate-500 leading-relaxed animate-in fade-in-0 duration-1000 delay-1200">
            No todas las palabras llegan a tiempo, ni todas las emociones son
            fáciles de enfrentar. Algunas se esconden, otras se pierden en el
            camino, y muchas necesitan esperar su momento. Pero lo que realmente
            toca, lo que deja marca en la memoria y en el corazón, siempre
            encuentra su instante. La vida es así: un espacio entre luces y
            sombras, donde cada reflexión tiene su lugar y cada sentimiento
            verdadero encuentra su voz.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        <LetterLink
          letterDay={LetterDates.first}
          title={Letters[LetterDates.first].title}
          description={Letters[LetterDates.first].description}
          href={Letters[LetterDates.first].href}
          character={Letters[LetterDates.first].character}
        />

        <LetterLink
          letterDay={LetterDates.second}
          title={Letters[LetterDates.second].title}
          description={Letters[LetterDates.second].description}
          href={Letters[LetterDates.second].href}
          character={Letters[LetterDates.second].character}
        />

        <LetterLink
          letterDay={LetterDates.third}
          title={Letters[LetterDates.third].title}
          description={Letters[LetterDates.third].description}
          href={Letters[LetterDates.third].href}
          character={Letters[LetterDates.third].character}
        />
      </div>

      {/* Footer Note */}
      <div className="text-center mt-20 animate-in fade-in-0 duration-1000 delay-1500">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            🎀
          </span>
          <span
            className="text-2xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            💭
          </span>
          <span className="text-2xl animate-pulse">🖤</span>
        </div>
        <p className="text-sm text-slate-400">
          Cada día trae su propia lección, cada palabra tiene su peso.
        </p>
      </div>
    </div>
  );
}
