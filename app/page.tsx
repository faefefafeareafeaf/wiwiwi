"use client"

import { useState, useEffect } from "react"
import { Heart, ChevronLeft, ChevronRight, X, MessageCircleHeart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function HomePage() {
  const [showMessage, setShowMessage] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showLoveLetter, setShowLoveLetter] = useState(false)
  const [heartClicks, setHeartClicks] = useState(0)
  const [showCollage, setShowCollage] = useState(false)
  const [showMemoryGame, setShowMemoryGame] = useState(false)
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; flipped: boolean; matched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [secretMessages, setSecretMessages] = useState<{ [key: number]: boolean }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Photos for the gallery - replace with actual photos
  const photos = [
    { src: "/images/milkmochheart.jpg", alt: "Nosotros juntos 1" },
    { src: "/images/hahaha.jpg", alt: "Nosotros juntos 2" },
    { src: "/images/meamasmucho.jpg", alt: "Nosotros juntos 3" },
    { src: "/images/muakteamo.jpg", alt: "Nosotros juntos 4" },
    { src: "/images/wiwiwiw.jpg", alt: "Nosotros juntos 5" },
  ]

  const collageImages = [
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (1).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (2).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (3).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (4).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (5).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (6).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (7).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (8).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (9).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (10).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM (11).jpeg",
    "/images/WhatsApp Image 2025-04-21 at 7.45.48 PM.jpeg",
  ]

  // Secret messages that appear when buttons are clicked
  const messages = [
    "Te amo más cada día",
    "Eres mi persona favorita",
    "Me enamoras siempre", // Updated message
    "Contigo todo es mejor",
    "Eres mi mayor felicidad",
  ]

  // Initialize memory game
  useEffect(() => {
    if (showMemoryGame) {
      const pairs = [
        { id: 1, emoji: "❤️" },
        { id: 2, emoji: "💖" },
        { id: 3, emoji: "💕" },
        { id: 4, emoji: "💘" },
        { id: 5, emoji: "💓" },
        { id: 6, emoji: "💗" },
      ]

      // Create pairs and shuffle
      const cards = [...pairs, ...pairs]
        .map((pair, index) => ({
          ...pair,
          uniqueId: index,
          flipped: false,
          matched: false,
        }))
        .sort(() => Math.random() - 0.5)

      setMemoryCards(cards)
    }
  }, [showMemoryGame])

  // Handle memory card flips
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = memoryCards[first]
      const secondCard = memoryCards[second]

      if (firstCard.id === secondCard.id) {
        // Match found
        setMemoryCards((cards) =>
          cards.map((card, index) => (index === first || index === second ? { ...card, matched: true } : card)),
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setMemoryCards((cards) =>
            cards.map((card, index) => (index === first || index === second ? { ...card, flipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, memoryCards])

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.title = "Te amo 💗";
  }, []);

  // Handle memory card click
  const handleCardClick = (index: number) => {
    // Prevent clicking if already two cards flipped or card already matched/flipped
    if (
      flippedCards.length >= 2 ||
      memoryCards[index].matched ||
      memoryCards[index].flipped ||
      flippedCards.includes(index)
    ) {
      return
    }

    // Flip the card
    setMemoryCards((cards) => cards.map((card, i) => (i === index ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, index])
  }

  // Toggle secret message
  const toggleSecretMessage = (index: number) => {
    setSecretMessages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{
              x: Math.random() * 100,
              y: -20,
              opacity: 0.7 + Math.random() * 0.3,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              y: window.innerHeight + 50,
              x: Math.sin(i) * 200 + Math.random() * window.innerWidth,
              opacity: 0,
            }}
            transition={{
              duration: 15 + Math.random() * 30,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart className="fill-pink-400" size={16 + Math.random() * 24} />
          </motion.div>
        ))}
      </div>

      <header className="pt-8 pb-4 px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center"
        >
          <Heart className="h-8 w-8 text-red-500 fill-red-500 mr-2" />
          <h1 className="text-3xl font-bold text-red-500">Feliz 7 Meses Juntos</h1>
          <Heart className="h-8 w-8 text-red-500 fill-red-500 ml-2" />
        </motion.div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute -right-4 -top-4 text-pink-200">
            <Heart className="h-32 w-32 fill-pink-100" />
          </div>

          <h2 className="text-2xl font-bold text-red-600 mb-4 relative z-10">Mi Amor</h2>

          <p className="text-lg text-gray-700 mb-6 relative z-10">
            Estos 7 meses a tu lado han sido los más hermosos de mi vida. Cada momento contigo es un regalo que aprecio con todo
            mi corazón.
          </p>

          <div
            className="w-full h-64 relative mb-6 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setShowGallery(true)}
          >
            <Image src="/images/banner.jpg" alt="Nosotros juntos" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-medium">Somos esos</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 italic">"Gracias por llenar mi vida de amor y felicidad."</p>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setShowLoveLetter(true)}
              className="flex items-center px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full transition-colors"
            >
              <MessageCircleHeart className="mr-2 h-5 w-5" />
              Carta de amor
            </button>

            <button
              onClick={() => setShowCollage(true)}
              className="flex items-center px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full transition-colors"
            >
              Mis Cosas Favoritas
            </button>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Heart className="absolute -top-3 -left-3 h-8 w-8 text-red-500 fill-red-500" />
            <h2 className="text-xl font-bold text-red-600 mb-3">Lo Que Amo De Ti</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Todo de ti",
                "Tu personalidad",
                "Lo bellizima que eres",
                "Los momentos que compartimos",
                "La manera en que me entiendes",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <button
                    onClick={() => toggleSecretMessage(index)}
                    className="flex items-center hover:text-pink-600 transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${secretMessages[index] ? "text-red-500 fill-red-500" : "text-pink-500 fill-pink-500"} mr-2`}
                    />
                    <span>{item}</span>
                  </button>

                  {secretMessages[index] && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-2 text-sm italic text-pink-600"
                    >
                      {messages[index]}
                    </motion.span>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            className="bg-white rounded-2xl shadow-lg p-6 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Heart className="absolute -top-3 -right-3 h-8 w-8 text-red-500 fill-red-500" />
            <h2 className="text-xl font-bold text-red-600 mb-3">Cosas que quiero hacer contigo</h2>
            <div className="space-y-3 text-gray-700">
              {[
                "Ir a la playa juntos",
                "Ver las estrellas",
                "Tener nuestra primera cita",
                "Hacer un viaje juntos",
                "Cocinar juntos",
              ].map((moment, index) => (
                <p key={index} className="flex items-start">
                  <Heart className="h-4 w-4 text-pink-500 fill-pink-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{moment}</span>
                </p>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section
          className="mt-8 bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">Quiero que estes conmigo para siempre</h2>
          <p className="text-lg text-gray-700 mb-6">
            Estoy emocionado por todos los momentos que aún nos quedan por vivir juntos. Cada día a tu lado es una nueva
            aventura.
          </p>

          <div
            onClick={() => {
              setHeartClicks((prev) => prev + 1)
            }}
            className="cursor-pointer inline-block"
          >
            <Heart
              className={`h-20 w-20 mx-auto text-red-500 fill-red-500 ${heartClicks > 0 ? "animate-pulse" : ""}`}
            />
          </div>

          <AnimatePresence>
            {heartClicks > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <p className="text-lg text-pink-600 font-medium">
                  {heartClicks === 1 && "¡Haz clic de nuevo en el corazón!"}
                  {heartClicks === 2 && "¡Una vez más!"}
                  {heartClicks === 3 && "¡Casi ahí!"}
                  {heartClicks === 4 && "¡Una última vez!"}
                  {heartClicks >= 5 && "¡Te amo infinitamente! Cada latido de mi corazón es tuyo."}
                </p>

                {heartClicks >= 5 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                        <Heart className="h-8 w-8 mx-1 text-red-500 fill-red-500" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-3xl font-bold text-red-600 mt-4">¡Te Amo Muchísimo!</h2>
          <p className="text-lg text-gray-700 mt-2">Gracias por estos maravillosos 7 meses juntos.</p>
        </motion.section>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Con todo mi amor ❤️</p>
      </footer>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[80vh]"
            >
              <button
                onClick={() => setShowGallery(false)}
                className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>

              <div className="relative h-[60vh]">
                <Image
                  src={photos[activePhoto].src || "/placeholder.svg"}
                  alt={photos[activePhoto].alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-4 flex justify-between items-center">
                <button
                  onClick={() => setActivePhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <p className="text-gray-700">
                  {activePhoto + 1} / {photos.length}
                </p>

                <button
                  onClick={() => setActivePhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter Modal */}
      <AnimatePresence>
        {showLoveLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoveLetter(false)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative bg-pink-50 rounded-xl overflow-hidden max-w-lg w-full p-8 shadow-lg"
              style={{
                backgroundImage: "url('/placeholder.svg?height=50&width=50&text=❤️')",
                backgroundSize: "20px",
                backgroundOpacity: 0.1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoveLetter(false)}
                className="absolute right-2 top-2 z-50 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                style={{ cursor: "pointer" }}
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>

              <div className="text-center mb-4">
                <Heart className="h-8 w-8 mx-auto text-red-500 fill-red-500" />
                <h3 className="text-2xl font-bold text-red-600">Mi Carta Para Ti</h3>
              </div>

              <div className="prose prose-pink mx-auto">
                <p className="text-gray-700 italic">Mi niña hermosa,</p>

                <p className="text-gray-700">
  Ya van siete meses desde que empezamos esto, y no dejo de pensar en lo increíble que ha sido todo contigo. A veces ni me creo la suerte que tengo de tenerte, aunque estemos lejos. Te juro que cada día contigo, incluso a la distancia, se siente como un regalo.
</p>

<p className="text-gray-700">
  Me haces sentir cosas que nunca había sentido, y no pasa un solo día sin que piense en lo mucho que te amo. Te amo con todo mi corazón, con todo lo que soy</p>

<p className="text-gray-700">
Y sí, a veces cuesta no poder abrazarte… pero solo saber que estás ahí, que me quieres, que somos nosotros, eso lo hace todo más fácil. Todo vale la pena por ti.</p>

<p className="text-gray-700">
  No puedo esperar al día en que por fin estemos juntos de verdad. Ese momento vive en mi cabeza casi siempre. Gracias por estos siete meses llenos de amor. Lo que tenemos es especial, y voy a seguir amándote cada día más, hasta que por fin pueda decirte todo esto mirándote a los ojos.
</p>


                <p className="text-gray-700 text-right">Con todo mi amor,</p>
                <p className="text-gray-700 text-right font-medium">Tu noviecito que te ama demasiado</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Game Modal */}
      <AnimatePresence>
        {showMemoryGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-white rounded-xl overflow-hidden max-w-md w-full p-6"
            >
              <button
                onClick={() => {
                  setShowMemoryGame(false)
                  setMemoryCards([])
                  setFlippedCards([])
                  setMatchedPairs(0)
                }}
                className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-red-600">Juego de Memoria</h3>
                <p className="text-sm text-gray-600">Encuentra todas las parejas de corazones</p>
              </div>

              {matchedPairs === 6 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <h4 className="text-xl font-bold text-pink-600 mb-2">¡Felicidades!</h4>
                  <p className="text-gray-700 mb-4">
                    Has encontrado todos los corazones, igual que encontraste el mío.
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(6)].map((_, i) => (
                      <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {memoryCards.map((card, index) => (
                    <motion.div
                      key={index}
                      className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-2xl ${
                        card.flipped || card.matched ? "bg-pink-100" : "bg-pink-500"
                      } ${card.matched ? "opacity-50" : ""}`}
                      onClick={() => handleCardClick(index)}
                      animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {(card.flipped || card.matched) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                          {card.emoji}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collage Modal */}
      <AnimatePresence>
        {showCollage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full p-6"
            >
              <button
                onClick={() => setShowCollage(false)}
                className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>

              <h3 className="text-xl font-bold text-red-600 text-center mb-4">Mis Cosas Favoritas</h3>
              <div className="grid grid-cols-3 gap-4">
                {collageImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-full h-32 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(src)}
                  >
                    <Image
                      src={src}
                      alt={`Collage ${index + 1}`}
                      fill
                      className="object-cover filter blur-sm group-hover:blur-none transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
              <div className="relative w-full h-[90vh]">
                <Image
                  src={selectedImage}
                  alt="Selected Collage"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
