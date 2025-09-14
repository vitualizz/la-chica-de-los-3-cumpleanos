"use client";

import LetterPageLayout from "@/components/LetterPageLayout";
import { useEmail } from "@/hooks/useEmail";
import { useState } from "react";

const LetterSmileLove = () => {
  const [text, setText] = useState("");
  const [sended, setSended] = useState(false);
  const { sendEmail } = useEmail();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmail(text);
    setSended(true);
  };

  return (
    <LetterPageLayout positionOptional={2}>
      <div className="space-y-8 text-slate-700 leading-relaxed">
        <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-xl font-light text-center mb-8 text-slate-600">
            "Entre la nostalgia y el caos, sonreír es un acto de rebeldía."
          </p>
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-500 space-y-6">
          <p>
            Una pregunta interesante: ¿vale la pena? No te voy a dar una
            respuesta concreta, eso depende de lo que tú creas, pero sí puedo
            decir lo que veo desde donde estoy. De todas las personas que
            conozco, tú eres de las que ya tiene esa pregunta contestada; al
            menos así me lo han dicho mis recuerdos contigo.
          </p>

          <p>
            Estamos aquí, entonces, aclaremos un poco la cabeza, pequeñá. Hay
            días en los que todo se tiñe de gris y la sonrisa parece un lujo
            imposible. Yo me rijo por un estoicismo medio práctico (me gusta
            pensar que me protejo así), pero ahora prefiero dejar mis ideas a un
            lado y recordarte quién eres, como diría Canserbero: yo te conozco
            tanto que podría recordarte quien eres por si lo olvidas.
          </p>

          <p>
            Las cosas pequeñas importan. Los instantes que te sacan una media
            sonrisa son un saldo a favor en esta cuenta cada vez más rara que es
            la vida. Y si quiero ser cínico, diría que sonreír frente al dolor
            es el acto más rebelde que se puede hacer: es negarse a darle todo
            el poder a la pena. Ahí donde otros ven derrota, la sonrisa es una
            resistencia mínima y profunda.
          </p>

          <p>
            Siempre te dije que te ves bonita sonriendo. No es un halago vacío:
            la sonrisa te cambia la cara y cambia el espacio alrededor; es
            barata y suma luz.
          </p>

          <p>
            Me acuerdo cuando me hablaste sobre una canción hace tiempo,
            Jeanette - “Soy rebelde”. Hay en esa letra una búsqueda de inocencia
            y de una felicidad simple, casi infantil: el deseo de volver a ser
            ese “niño” que mira el mundo sin tanto lastre. Me gustaría que la
            escuches otra vez pensando en eso: que la canción no pide
            perfección, pide permiso para creer en algo leve. Ojalá la frase que
            te queda de esa canción te abrace en los días duros y te recuerde
            que también está bien querer ser feliz como quien quiere jugar otra
            vez.
          </p>

          <p>
            Y ahora, lo de siempre, el día de las flores amarillas. Ya te digo,
            nunca fueron lo mío. Me parecen cosas bonitas pero repetidas, un
            gesto que a veces se queda en automático. Prefiero regalar tiempo.
            Prefiero regalar presencia. Prefiero que lo que te dé no sea algo
            que se compra rápido, sino algo que se construye despacio. Por eso
            las flores amarillas me suenan a cliché, prefiero darte horas,
            escritos filosóficos, o una carta vieja escrita a mano que puedas
            guardar(Aunque en estos casos virtuales xd). Las flores se
            marchitan; el tiempo compartido se vuelve memoria.
          </p>

          <p>
            Aun así, si la costumbre manda y muchos chibolos princesos te van a
            traer ramos, yo te daré una mandarina, la cual compartiremos. Suena
            tonto, pero en mi cabeza eso es más mío lo simple, lo que se parte y
            se reparte. Estará por aquí el 21. Y si entiendes la metáfora,
            sabrás que prefiero darte un pedazo de tiempo antes que un arreglo
            que se seca.
          </p>

          <p>
            Si vuelves por esta página, sabrás que existo y que, entre todo el
            ruido, te deseo cosas simples: resiliencia, risas, y días que te
            devuelvan la curiosidad. Supongo que de vez en cuando te gusta leer
            mis desvaríos; yo sigo escribiendo para que aparezcas entre las
            líneas. Ahora vuelvo a mis cosas: seguiré destruyendo y arreglando
            el mundo a mi manera (que viene a ser un desorden creativo).
          </p>

          <p>
            Termino con lo que siempre supe: sonreír no borra la verdad, pero a
            veces la hace más soportable. Y si alguna vez dudas de si vale la
            pena, recuerda que la sonrisa puede ser la primera gota de lluvia
            que frene un incendio.
          </p>

          <p>
            Cuídate. Y si algún día te atrapa la melancolía, recuerda que hay
            una canción y una mandarina esperándote. Besito en tu carita bonita.
          </p>
        </div>
        <div>
          <p className="font-light text-slate-600 border-l-4 border-gray-500 pl-4 text-lg">
            No tienes que subir una montaña para estar en la cima del mundo, que
            hasta el lugar más horrible de todos puede ser hermoso mientras te
            tomes el tiempo de ver, y que esta bien perderse siempre y cuando
            puedas volver... - Violet y Finch
          </p>
          <p className="text-xl text-slate-600 my-2">
            ¿Qué es lo que a ti te hace volver a sonreír, incluso en los días
            más grises?
          </p>
          {sended ? (
            <p className="text-xl text-slate-600 my-2">
              Gracias por tu respuesta. Te responderemos en breve.
            </p>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <textarea
                rows={4}
                placeholder="Pequeña saltamontes, ¿qué te hace sonreír?"
                className="border-2 border-gray-500 rounded-md p-2"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md cursor-pointer"
                type="submit"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </LetterPageLayout>
  );
};

export default LetterSmileLove;
