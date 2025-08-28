export enum LetterDates {
  // first = 28,
  // second = 29,
  // third = 30,
  first = 26,
  second = 27,
  third = 28,
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
