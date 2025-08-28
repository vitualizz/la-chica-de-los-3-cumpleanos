import { useGetCharacter } from "@/hooks/useCharacter";
import { LetterDates } from "../constants/LetterDates";
import LetterLink from "@/components/LetterLink";

export default function Home() {
  const kuromi = useGetCharacter('kuromi');
  const helloKitty = useGetCharacter('hello-kitty');

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
        <div
          className="absolute top-52 md:top-40 left-40 md:left-1/4 text-4xl opacity-80 md:opacity-10 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        >
          💌
        </div>

        <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-20 md:mb-6 leading-tight">
          La chica de los
          <span className="block text-pink-500 animate-in slide-in-from-right-4 duration-1000 delay-500">
            3 cumpleaños
          </span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-slate-600 leading-relaxed mb-8 animate-in fade-in-0 duration-1000 delay-700">
            La vida no siempre es perfecta, pero hay momentos que merecen ser
            recordados. Esta es una reflexión honesta contada en tres actos,
            tres días, tres verdades.
          </p>

          <div
            className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-8 
                           animate-in slide-in-from-left-4 duration-1000 delay-1000"
          />

          <p className="text-slate-500 leading-relaxed animate-in fade-in-0 duration-1000 delay-1200">
            Cada reflexión llegará cuando tenga que llegar. No todo es color de
            rosa, pero tampoco todo es gris. Así es la vida real, así son las
            palabras que realmente importan.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        <LetterLink
          letterDay={LetterDates.first}
          title="Primera Carta"
          description="La cruda realidad del comienzo. Palabras sin filtro sobre lo que realmente significa crecer y enfrentar la vida tal como es."
          href="/carta-28"
          character="hello-kitty"
        />

        <LetterLink
          letterDay={LetterDates.second}
          title="Segunda Carta"
          description="El punto medio de la reflexión. Donde aceptamos que no todo está bien, pero seguimos adelante porque es lo que toca hacer."
          href="/carta-29"
        />

        <LetterLink
          letterDay={LetterDates.third}
          title="Tercera Carta"
          description="La conclusión honesta. Sin finales de cuento de hadas, solo la realidad de seguir creciendo y aprendiendo de cada experiencia."
          href="/carta-30"
          character="kuromi"
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
