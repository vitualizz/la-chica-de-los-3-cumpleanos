'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sparkles, Moon, Star } from 'lucide-react'
import { useEmail } from '@/hooks/useEmail'

const CartaJawolin = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSpookyMode, setIsSpookyMode] = useState(true)
  const [floatingGhosts, setFloatingGhosts] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])
  const [showScareModal, setShowScareModal] = useState(false)
  const [countdown, setCountdown] = useState<3 | 2 | 1 | 0>(3)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { sendEmail } = useEmail()

  // Crear fantasmas flotantes
  useEffect(() => {
    const ghosts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setFloatingGhosts(ghosts)
  }, [])

  const toggleSpookyMode = () => {
    setIsSpookyMode(!isSpookyMode)
  }

  // Control del modal y cuenta regresiva
  useEffect(() => {
    if (!showScareModal) return
    setCountdown(3)
    const t1 = setTimeout(() => setCountdown(2), 800)
    const t2 = setTimeout(() => setCountdown(1), 1600)
    const t3 = setTimeout(() => setCountdown(0), 2400)
    const t4 = setTimeout(() => {
      if (videoRef.current) {
        // Autoplay después de la cuenta regresiva
        videoRef.current.play().catch(() => {})
      }
    }, 2600)
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
    }
  }, [showScareModal])

  // Vibración ligera en móviles durante la cuenta regresiva
  useEffect(() => {
    if (showScareModal && countdown > 0 && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      // 50ms vibración por tick
      try { (navigator as any).vibrate?.(50) } catch {}
    }
  }, [countdown, showScareModal])

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isSpookyMode 
        ? 'bg-gradient-to-br from-purple-900 via-black to-orange-900' 
        : 'bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100'
    }`}>
      {/* Efecto de partículas que siguen el mouse */}
      <div 
        className="fixed pointer-events-none z-50 transition-all duration-300"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      >
        <div className={`w-5 h-5 rounded-full ${
          isSpookyMode ? 'bg-orange-400 shadow-orange-400' : 'bg-pink-400 shadow-pink-400'
        } shadow-lg animate-pulse`} />
      </div>

      {/* Fantasmas flotantes */}
      {floatingGhosts.map((ghost) => (
        <div
          key={ghost.id}
          className="fixed text-4xl opacity-20 pointer-events-none z-10 animate-bounce"
          style={{
            left: `${ghost.x}%`,
            top: `${ghost.y}%`,
            animationDelay: `${ghost.delay}s`,
            animationDuration: '6s'
          }}
        >
          👻
        </div>
      ))}

      {/* Estrellas parpadeantes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`fixed text-lg opacity-60 pointer-events-none z-10 animate-pulse ${
            isSpookyMode ? 'text-yellow-300' : 'text-pink-300'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          ✨
        </div>
      ))}

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-20">
        {/* Botón de modo espeluznante */}
        <div className="fixed top-6 right-6 z-30">
          <button
            onClick={toggleSpookyMode}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isSpookyMode 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isSpookyMode ? <Moon size={24} /> : <Sparkles size={24} />}
          </button>
        </div>

        {/* Header con efectos especiales */}
        <div className="text-center mb-16 animate-in slide-in-from-top-4 duration-1000">
          {/* Círculo con número mágico */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-in zoom-in-0 duration-1000 delay-300 ${
            isSpookyMode 
              ? 'bg-gradient-to-br from-orange-500 to-red-600 border-2 border-orange-300 shadow-orange-500/50' 
              : 'bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-pink-300 shadow-pink-500/50'
          } shadow-2xl`}>
            <span className="text-3xl font-bold text-white animate-pulse">🎃</span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold mb-4 animate-in slide-in-from-bottom-4 duration-1000 delay-500 ${
            isSpookyMode ? 'text-orange-300' : 'text-purple-800'
          }`}>
            Carta "Jawolin"
          </h1>

          {/* Línea decorativa con gradiente */}
          <div className={`w-40 h-1 mx-auto mb-8 animate-in slide-in-from-left-4 duration-1000 delay-700 ${
            isSpookyMode 
              ? 'bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400' 
              : 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400'
          } rounded-full shadow-lg`} />
        </div>

        {/* Contenido principal con efectos */}
        <div className={`prose prose-lg max-w-3xl mx-auto animate-in fade-in-0 duration-1000 delay-900 ${
          isSpookyMode ? 'prose-invert' : ''
        }`}>
          {/* Tarjeta principal con efectos hover */}
          <div className={`relative p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
            isSpookyMode 
              ? 'bg-gradient-to-br from-gray-800/80 to-purple-900/80 border border-orange-400/30' 
              : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200/50'
          } backdrop-blur-sm`}>
            
            {/* Efecto de brillo en los bordes */}
            <div className={`absolute inset-0 rounded-3xl ${
              isSpookyMode 
                ? 'bg-gradient-to-r from-orange-400/20 via-transparent to-red-400/20' 
                : 'bg-gradient-to-r from-pink-400/20 via-transparent to-purple-400/20'
            } opacity-0 hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10">
              {/* Iconos decorativos */}
              <div className="flex justify-center gap-4 mb-6">
                <div className={`text-3xl animate-bounce ${
                  isSpookyMode ? 'text-orange-400' : 'text-pink-400'
                }`} style={{ animationDelay: '0s' }}>
                  🎃
                </div>
                <div className={`text-3xl animate-bounce ${
                  isSpookyMode ? 'text-yellow-400' : 'text-purple-400'
                }`} style={{ animationDelay: '0.5s' }}>
                  👻
                </div>
                <div className={`text-3xl animate-bounce ${
                  isSpookyMode ? 'text-red-400' : 'text-indigo-400'
                }`} style={{ animationDelay: '1s' }}>
                  🦇
        </div>
              </div>

              {/* Texto principal - Contenido de la carta */}
              <div className={`space-y-6 ${
                isSpookyMode ? 'text-orange-100' : 'text-slate-700'
              }`}>
                <h2 className={`text-3xl font-bold text-center ${
                  isSpookyMode ? 'text-orange-300' : 'text-purple-800'
                }`}>
                  🌒 El villano también sangra
                </h2>
                
                <p>
                  Sinceramente, es raro escribir esto, más raro aún porque siento que me van a robar :v.
                  Pero ya que estamos aquí, sigamos con esta locura, ¿no? Al fin y al cabo, ya no pedimos
                  dulces, pero sí disfrutamos de los trucos. Y vaya que la vida ha sabido jugar con nosotros.
                </p>
                <p>
                  Octubre huele a máscaras, a recuerdos que se disfrazan de olvido. Es el mes de los sustos, aunque a estas alturas,
                  lo que más miedo da no son los fantasmas, sino los vivos.
                </p>

                <h3 className={`text-2xl font-semibold ${isSpookyMode ? 'text-orange-300' : 'text-purple-800'}`}>La verdad y los villanos</h3>
                <p>
                  Hablemos de eso, de lo que realmente asusta: la verdad. Y para hacerlo más divertido, hablemos de los villanos.
                  ¿No te parece curioso que los personajes más interesantes siempre sean ellos? No son héroes, pero tienen más alma.
                  No nacen del mal, sino de una herida. A veces del amor que se pudre, de un ideal que se quiebra, o de una esperanza que no resistió el tiempo.
                  Los héroes salvan al mundo; los villanos intentan salvarse a sí mismos.
                </p>

                <p>
                  Y ahí me quedo pensando ¿soy el malo, o simplemente alguien demasiado fiel a su naturaleza?
                  ¿Soy cruel por no saber amar o por no poder dejar de hacerlo? A veces me pregunto si los “malos” no somos solo
                  los que sentimos demasiado y no supimos esconderlo a tiempo. Después de todo, el diablo también fue un ángel alguna vez,
                  solo que no supo quedarse quieto.
                </p>

                <h3 className={`text-2xl font-semibold ${isSpookyMode ? 'text-orange-300' : 'text-purple-800'}`}>Monstruos y espejos</h3>
                <p>
                  ¿Y si los monstruos que tememos no son más que reflejos de lo que no queremos aceptar? Somos hijos de nuestras fobias,
                  criaturas de un miedo que heredamos y perfeccionamos. Nos volvemos fríos para no sufrir, sarcásticos para no llorar,
                  lógicos para no recordar. Y en el intento de no sentir, nos volvemos justo lo que temíamos: vacíos, pero dignos.
                  Quizás el verdadero villano no es quien destruye, sino quien se atreve a mirar el abismo y no huye.
                </p>

                <p>
                  A veces pienso que soy un chiste, un maldito chiste con buena gramática. Un tipo que se ríe de sí mismo porque no queda de otra.
                  El problema es que me sigo tomando en serio cuando cae la noche.
                </p>

                <h3 className={`text-2xl font-semibold ${isSpookyMode ? 'text-orange-300' : 'text-purple-800'}`}>Tu pregunta</h3>
                <p>
                  Ahora, sobre tu pregunta. "Entonces aún me extrañas o solo te gusta la idea de que alguien no te pueda superar y ser feliz?"
                  Soy demasiado orgulloso para admitir lo que siento, aunque de cierta manera, supongo que los escritos denotan lo más obvio.
                  Siempre lo supiste, incluso cuando fingía que no te veía. Mi estilo es el desinterés, pero no porque no me importe, sino porque me importa demasiado.
                  Odio sentir, y ese es justo el problema.
                </p>
                <p>
                  ¿Cómo puedo extrañarte si, de alguna forma, nunca te fuiste? Si aún estás aquí, entre mis palabras, entre los silencios que relleno con sarcasmo.
                </p>

                <h3 className={`text-2xl font-semibold ${isSpookyMode ? 'text-orange-300' : 'text-purple-800'}`}>Si yo fuera el malo…</h3>
                <p>
                  Y si fuese el malo… ¿por qué sigo escribiéndote? ¿por qué te hice el amor con tanta ternura? ¿por qué mis noches siguen oliendo a ti, aunque jure que ya no?
                  Tal vez el villano no es el que rompe corazones, sino el que no puede soltar el suyo.
                </p>
                <p>
                  Soy un chiste que nadie entendió. Y sí, algún día debatiré con Dios, no para saber si soy bueno o malo,
                  sino para entender por qué carajo, existo, al fin y al cabo amo la filosofía.
                </p>

                <p>
                  Hasta entonces, seguiré siendo lo que mejor me sale: un villano con buen gusto y mala memoria.
                </p>

                <div className={`text-center p-4 rounded-xl ${
                  isSpookyMode ? 'bg-black/30 border border-orange-400/30' : 'bg-white/60 border border-pink-300/40'
                }`}>
                  <p className="text-lg font-medium">
                    Dulce o beso en la frente, o ambos si quieres xd
                  </p>
                </div>
              </div>

              {/* Botón interactivo especial */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    // Vibración inicial al abrir
                    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                      try { (navigator as any).vibrate?.([100, 50, 100]) } catch {}
                    }
                    // Enviar correo
                    try { sendEmail('Abrió el modal de susto (Jawolin)') } catch {}
                    setShowScareModal(true)
                  }}
                  className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-110 ${
                    isSpookyMode 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/50' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/50'
                  } shadow-xl hover:shadow-2xl`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🎃
                    Presióname si quieres un momento de terror al estilo 2023
                    🎃
                  </span>
                </button>
              </div>
              </div>
            </div>
        </div>

        {/* Sección: Playlist de Spotify */}
        {/* <div className="max-w-3xl mx-auto mt-12 animate-in fade-in-0 duration-1000 delay-1000">
          <div className={`p-6 rounded-3xl shadow-2xl transition-all ${
            isSpookyMode 
              ? 'bg-gradient-to-br from-gray-900/60 to-purple-900/60 border border-orange-400/30' 
              : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200/50'
          } backdrop-blur-sm`}>
            <h3 className={`text-2xl font-semibold mb-4 ${isSpookyMode ? 'text-orange-300' : 'text-purple-800'}`}>
              Tu soundtrack para esta carta
            </h3>

            <p className={`${isSpookyMode ? 'text-orange-100' : 'text-slate-700'} mb-4`}>
              Pega un enlace de playlist de Spotify y la reproducimos aquí mismo.
            </p>

            {/* Input + vista previa */}
            {/* <SpotifyEmbed isSpooky={isSpookyMode} /> */}
          {/* </div> */}
        {/* </div> */}
        {/* Navegación con efectos especiales */}
        <div className="text-center mt-20 animate-in slide-in-from-bottom-4 duration-1000 delay-1100">
          <Link
            href="/"
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
              isSpookyMode 
                ? 'text-orange-200 hover:text-white bg-gray-800/50 hover:bg-gray-700/70 border border-orange-400/30 hover:border-orange-400/50' 
                : 'text-slate-600 hover:text-slate-800 bg-white/80 hover:bg-white/90 border border-pink-200/50 hover:border-pink-300/50'
            } shadow-lg hover:shadow-xl backdrop-blur-sm`}
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Volver a las cartas
          </Link>
        </div>
      </div>

      {/* Efectos de fondo adicionales */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Lunas crecientes flotantes */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`absolute text-6xl opacity-10 animate-float ${
              isSpookyMode ? 'text-yellow-300' : 'text-pink-300'
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s'
            }}
          >
            🌙
          </div>
        ))}

        {/* Kuromi flotante - animación */}
        <div className="absolute bottom-10 left-6 opacity-20 animate-float-slow">
          <Image src="/assets/kuromi.svg" alt="Kuromi" width={80} height={80} />
        </div>
        <div className="absolute top-16 right-8 opacity-20 animate-float-slower">
          <Image src="/assets/kuromi.svg" alt="Kuromi" width={64} height={64} />
        </div>
      </div>

      {/* Modal de susto con cuenta regresiva y video */}
      {showScareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowScareModal(false)} />
          {/* Contenido */}
          <div className="relative z-10 w-[90%] max-w-2xl p-6 rounded-2xl shadow-2xl border bg-gradient-to-br from-black/60 to-gray-900/60 border-orange-400/30">
            {countdown > 0 ? (
              <div className="text-center py-12">
                <p className="text-orange-200 mb-4 text-lg">Te asustarás en</p>
                <div className="text-6xl font-extrabold text-orange-400 animate-ping-slow">
                  {countdown}
                </div>
              </div>
            ) : (
              <div>
                <video
                  ref={videoRef}
                  src="/assets/cumple.webm"
                  className="w-full rounded-lg"
                  controls
                  playsInline
                  autoPlay
                  muted={false}
                />
                <div className="text-center mt-3">
                  <button
                    onClick={() => setShowScareModal(false)}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 11s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 14s ease-in-out infinite;
        }
        .animate-ping-slow { 
          animation: ping 0.8s ease-in-out infinite; 
        }
        @keyframes ping { 
          0% { transform: scale(0.8); opacity: 0.6; } 
          50% { transform: scale(1.1); opacity: 1; } 
          100% { transform: scale(0.8); opacity: 0.6; } 
        }
      `}</style>
    </div>
  )
}

export default CartaJawolin

// --- Spotify embed helper ---
type SpotifyEmbedProps = { isSpooky: boolean }

const SpotifyEmbed = ({ isSpooky }: SpotifyEmbedProps) => {
  const [inputUrl, setInputUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')

  const extractSpotifyEmbedUrl = (url: string) => {
    try {
      const u = new URL(url)
      if (u.hostname.includes('open.spotify.com')) {
        // Supported: /playlist/{id}, /album/{id}, /track/{id}
        const parts = u.pathname.split('/').filter(Boolean)
        if (parts.length >= 2) {
          const type = parts[0]
          const id = parts[1]
          if (['playlist', 'album', 'track'].includes(type)) {
            return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`
          }
        }
      }
      return ''
    } catch {
      return ''
    }
  }

  const handlePreview = () => {
    const out = extractSpotifyEmbedUrl(inputUrl)
    setEmbedUrl(out)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Pega aquí el enlace de tu playlist de Spotify"
          className={`flex-1 px-4 py-3 rounded-xl border outline-none transition-colors ${
            isSpooky ? 'bg-black/40 border-orange-400/30 text-orange-100 placeholder-orange-200/40' : 'bg-white border-pink-300 text-slate-700 placeholder-slate-400'
          }`}
        />
        <button
          onClick={handlePreview}
          className={`px-5 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
            isSpooky ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          Previsualizar
        </button>
      </div>

      {embedUrl && (
        <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={embedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}
