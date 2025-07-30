"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface PhraseWithAudioProps {
  text: string
  lang?: string // "en-US" or "fr-FR"
}

export function PhraseWithAudio({ text, lang = "en-US" }: PhraseWithAudioProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const toggleSpeech = () => {
    const synth = window.speechSynthesis

    if (isSpeaking) {
      synth.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.95
    utterance.pitch = 1.05
    utterance.volume = 1
    utterance.onend = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    synth.speak(utterance)
    setIsSpeaking(true)
  }

  return (
    <div className="flex items-start gap-2 group">
      <Button
        variant="ghost"
        size="icon"
        className="mt-1 h-7 w-7 text-slate-500 hover:text-blue-600"
        onClick={toggleSpeech}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
      <p className="text-slate-700">{text}</p>
    </div>
  )
}
