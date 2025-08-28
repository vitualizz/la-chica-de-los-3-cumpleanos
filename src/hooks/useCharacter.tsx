import Image from "next/image";

export const useGetCharacter = (character: string | undefined) => {
  if (character === "hello-kitty")
    return (
      <Image
        src="/assets/hello-kitty.svg"
        alt="Hello Kitty"
        width={64}
        height={64}
      />
    );
  if (character === "kuromi")
    return (
      <Image src="/assets/kuromi.svg" alt="Kuromi" width={64} height={64} />
    );

  if (character === "melody")
    return (
      <Image src="/assets/mymelody.svg" alt="Melody" width={64} height={64} />
    );
  return "💌";
};

export const useGetColors = (characterName: string | undefined) => {
  if (characterName === "kuromi")
    return {
      bg: "from-purple-50 to-gray-50",
      border: "border-purple-200",
      accent: "text-purple-600",
      button: "bg-purple-500 hover:bg-purple-600",
    };
  if (characterName === "hello-kitty")
    return {
      bg: "from-pink-50 to-red-50",
      border: "border-pink-200",
      accent: "text-pink-600",
      button: "bg-pink-500 hover:bg-pink-600",
    };
  return {
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    accent: "text-blue-600",
    button: "bg-blue-500 hover:bg-blue-600",
  };
};
