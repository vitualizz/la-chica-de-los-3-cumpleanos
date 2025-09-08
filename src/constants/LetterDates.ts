export enum LetterDates {
  first = 28,
  second = 29,
  third = 30,
}

export const LetterSecretQuestions: Record<
  number,
  { question: string; answer: string; hint: string }
> = {
  [LetterDates.first]: {
    question: "Completa la frase: Make a _____",
    answer: "wish",
    hint: "El nombre de muchas playlists",
  },
  [LetterDates.second]: {
    question: "I will not _____",
    answer: "leave",
    hint: "Una de las cartas del notion",
  },
  [LetterDates.third]: {
    question: "Coloreando con Azul _______",
    answer: "cielo",
    hint: "Uno de los nombres más bonitos",
  },
};

export const Letters: Record<number, { title: string, description: string, href: string, character: string }> = {
  [LetterDates.first]: {
    title: "Callate, Weigel",
    description: "No vengo a fingir que todo fue correcto. Pero si a reconocer que tu cumpleaños importa.",
    href: "/carta-28",
    character: "hello-kitty",
  },
  [LetterDates.second]: {
    title: "22 vueltas al sol",
    description: "La prueba de que la vida te ha dejado caer, levantarte y volver a mirar al cielo.",
    href: "/carta-29",
    character: "melody",
  },
  [LetterDates.third]: {
    title: "Sigue viviendo",
    description: "Ya pasó el día, pero tu vida no se queda en un calendario.",
    href: "/carta-30",
    character: "kuromi",
  },
}
