export const LetterOptionalQuestions: Record<
  number,
  { question: string; answer: string; hint: string }
> = {
  [1]: {
    question: "En Shingeki no Kyojin, que Ackerman es el que te regalé?",
    answer: "Levi",
    hint: "El mejor Ackerman",
  },
  [2]: {
    question: "La persona que no busca la felicidad, pero será feliz, ¿quién es?",
    answer: "lee",
    hint: "Su nombre tiene 3 letras",
  },
};

export const LetterOptionals: Record<
  number,
  { title: string; description: string; href: string; character: string }
> = {
  [1]: {
    title: "¿Quieres seguir leyendome?",
    description:
      "Entre páginas se esconden las respuestas que la vida aún no nos da.",
    href: "/te-gusta-leer",
    character: "hello-kitty",
  },
  [2]: {
    title: "¿Vale la pena sonreír?",
    description:
      "Entre la nostalgia y el caos, sonreír es un acto de rebeldía.",
    href: "/sonrie-pequena",
    character: "kuromi",
  },
};
