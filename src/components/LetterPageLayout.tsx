"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetCharacter, useGetColors } from "@/hooks/useCharacter";
import { cn } from "@/lib/utils";
import { Letters } from "@/constants/LetterDates";
import { LetterOptionals } from "@/constants/LetterOptionals";
import FlowersBluePage from "@/components/FlowerBluePage";

type Props = {
  children: ReactNode;
  day?: number;
  positionOptional?: number;
};

const LetterPageLayout = ({ children, day, positionOptional }: Props) => {
  const title = day ? Letters[day].title : LetterOptionals[positionOptional ?? 1].title;
  const character = day ? Letters[day].character : LetterOptionals[positionOptional ?? 1].character;
  const characterShow = useGetCharacter(character);
  const colors = useGetColors(character);

  if (true) return <FlowersBluePage />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Floating character decorations */}
      <div
        className="fixed top-20 right-10 text-4xl opacity-20 animate-bounce pointer-events-none z-10"
        style={{ animationDuration: "4s", animationDelay: "0s" }}
      >
        {characterShow}
      </div>
      <div
        className="fixed bottom-20 left-10 text-3xl opacity-15 animate-bounce pointer-events-none z-10"
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      >
        {characterShow}
      </div>

      {/* Header */}
      <div className="text-center mb-16 animate-in slide-in-from-top-4 duration-1000">
        <div
          className={cn('inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 animate-in zoom-in-0 duration-1000 delay-300', colors.bg, colors.border)}
        >
          <span className="text-2xl font-light">{day}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
          {title}
        </h1>

        <div
          className="w-32 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto 
                         animate-in slide-in-from-left-4 duration-1000 delay-700"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-3xl mx-auto animate-in fade-in-0 duration-1000 delay-900">
        {children}
      </div>

      {/* Navigation */}
      <div className="text-center mt-20 animate-in slide-in-from-bottom-4 duration-1000 delay-1100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 
                     bg-white/80 hover:bg-white/90 rounded-full border border-white/20 
                     shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Volver a las cartas
        </Link>
      </div>
    </div>
  );
};

export default LetterPageLayout;
