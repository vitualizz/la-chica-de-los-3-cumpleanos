"use client";

import { useState } from "react";
import { X, Heart, Lock } from "lucide-react";
import { LetterSecretQuestions } from "@/constants/LetterDates";
import { useGetCharacter, useGetColors } from "@/hooks/useCharacter";
import { cn } from "@/lib/utils";

type SecretQuestionModalProps = {
  isOpen: boolean;
  onCorrentAnswer: () => void;
  onClose: () => void;
  letterDay: number;
  characterName?: string;
};

const SecretQuestionModal = ({
  isOpen,
  onClose,
  onCorrentAnswer,
  letterDay,
  characterName,
}: SecretQuestionModalProps) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const question = LetterSecretQuestions[letterDay];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
      onCorrentAnswer();
    } else {
      setShowHint(true);
      setAnswer("");
    }
  };

  const character = useGetCharacter(characterName);
  const colors = useGetColors(characterName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-semibold",
                  colors.bg,
                  colors.accent,
                )}
              >
                {letterDay}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Pregunta Secreta
                </h3>
                <p className="text-sm text-gray-500">
                  Carta del día {letterDay}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <>
            <div className="text-center mb-6">
              <div
                className="justify-items-center my-2 animate-bounce"
                style={{ animationDuration: "1.6s" }}
              >
                {character}
              </div>
              <Lock size={24} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">
                Para abrir esta carta, necesitas responder una pequeña pregunta:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.question}
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tu respuesta..."
                  autoFocus
                />
              </div>

              {showHint && (
                <div className="text-sm text-red-500 animate-in slide-in-from-top-2 duration-300">
                  {question.hint}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className={cn(
                    "flex-1 py-3 px-4 bg-gradient-to-r text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium",
                    colors.button,
                  )}
                >
                  Responder
                </button>
              </div>
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default SecretQuestionModal;
