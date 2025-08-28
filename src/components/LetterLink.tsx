"use client";

import useLetterInfo from "@/hooks/useLetterInfo";
import { useState } from "react";
import { Lock, Eye } from "lucide-react";
import { useGetCharacter, useGetColors } from "@/hooks/useCharacter";
import { cn } from "@/lib/utils";
import SecretQuestionModal from "./SecretQuestionModal";

type Props = {
  letterDay: number;
  title: string;
  description: string;
  href: string;
  character?: string;
};

const LetterLink = ({
  letterDay,
  title,
  description,
  href,
  character,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { isAvailable } = useLetterInfo(letterDay);
  const characterShow = useGetCharacter(character);
  const colors = useGetColors(character);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAvailable) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleCorrectAnswer = () => {
    setShowModal(false)
    window.location.href = href;
  }

  if (!isAvailable) {
    return (
      <div
        className={
          "group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in slide-in-from-bottom-4 bg-gradient-to-tl from-gray-300 to-gray-400 border-gray-300"
        }
      >
        <div className="absolute top-4 right-4 text-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          {characterShow}
        </div>

        {/* Lock icon */}
        <div className="relative">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full 
                           mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <Lock size={24} className="text-white" />
          </div>
          <span className="text-white bottom-9 absolute">Carta Bloqueada</span>
        </div>

        <h3 className="text-2xl font-light text-white">{title}</h3>

        <p className="text-gray-100 leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        <div className="mb-6 text-sm text-white transition-colors">
          Al llegar a {letterDay} día de agosto, esta carta estará disponible.
        </div>

        <div
          className={cn(
            "inline-flex items-center text-white gap-2 px-6 py-3 w-full justify-center rounded-full shadow-lg cursor-not-allowed opacity-60 bg-gray-600",
          )}
        >
          <span>Muy pronto disponible</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div onClick={handleCardClick} className="cursor-pointer">
        <div
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-gradient-to-br border p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in slide-in-from-bottom-4",
            colors.bg,
            colors.border,
          )}
        >
          {/* Character decoration */}
          <div
            className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-60 
                         group-hover:scale-110 transition-all duration-300"
          >
            {characterShow}
          </div>

          {/* Available icon */}
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full 
                          bg-white/80 mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            <Eye size={24} className={colors.accent} />
          </div>

          <h3 className="text-2xl font-light text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
            {title}
          </h3>

          <p className="text-slate-600 leading-relaxed mb-8 group-hover:text-slate-700 transition-colors">
            {description}
          </p>

          <div
            className={cn(
              "inline-flex items-center text-white gap-2 px-6 py-3 w-full justify-center rounded-full shadow-lg cursor-not-allowed opacity-60",
              colors.button,
            )}
          >
            <span>Leer carta</span>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              💌
            </div>
          </div>
        </div>
      </div>
      <SecretQuestionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCorrentAnswer={handleCorrectAnswer}
        letterDay={letterDay}
        characterName={character}
      />
    </>
  );
};

export default LetterLink;
