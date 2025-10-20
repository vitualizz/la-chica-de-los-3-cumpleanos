'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Cielo Azul",
//   description: "Para la chica que debe sonreir más",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const visibleText = () => {
    const o = document.getElementById("o");
    if (o) {
      o.classList.add("hidden");
    }

    const textContainer = document.getElementById("text-container");
    const multipleResponses = [
      'Eres babosa',
      'Eres hombre',
      'No sabes lo que quieres',
      'Lamentablemente eres humana',
    ]
    const btnClick = document.querySelector("button");
    if (btnClick) {
      btnClick.classList.add("hidden");
    }
    const randomResponse = multipleResponses[Math.floor(Math.random() * multipleResponses.length)];

    if (!textContainer) {
      return;
    }

    textContainer.innerHTML =  `<p class="text-2xl font-bold">${randomResponse}</p>`;
  }

  return (
    <html
      title="Cielo Azul"
    >
      <body
      >
        <div className="flex flex-col">
          <p id="o">La respuesta correcta a todas tus dudas mentales:</p>
          <button onClick={visibleText} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Cada touch seré yo diciendote babosa :D
          </button>
        </div>
        <div id="text-container">
        </div>
      </body>
    </html>
  );
}
