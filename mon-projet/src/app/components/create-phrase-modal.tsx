"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Sparkles, Send } from "lucide-react"

interface CreatePhraseModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (keyword: string, sentences: string[]) => Promise<boolean>
}

export function CreatePhraseModal({ open, onClose, onSubmit }: CreatePhraseModalProps) {
  const [keyword, setKeyword] = useState("")
  const [sentences, setSentences] = useState(["", "", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = Sonner()


  const handleChange = (index: number, value: string) => {
    const newSentences = [...sentences]
    newSentences[index] = value
    setSentences(newSentences)
  }

  const generateExamples = () => {
    if (!keyword.trim()) {
      toast({
        title: "Enter a keyword first",
        description: "Please enter a keyword before generating examples.",
        variant: "destructive",
      })
      return
    }

    const generated = [
      `I love using the word "${keyword}" in daily conversations.`,
      `Here's another sentence with "${keyword}" to help you understand it.`,
      `Try to write your own sentence using "${keyword}".`,
    ]
    setSentences(generated)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!keyword.trim()) {
      toast({
        title: "Keyword required",
        description: "Please enter a keyword.",
        variant: "destructive",
      })
      return
    }

    if (sentences.every((s) => !s.trim())) {
      toast({
        title: "Sentences required",
        description: "Please enter at least one sentence.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const success = await onSubmit(
      keyword,
      sentences.filter((s) => s.trim()),
    )

    if (success) {
      toast({
        title: "Success!",
        description: "Your phrases have been created successfully.",
      })
      setSentences(["", "", ""])
      setKeyword("")
    } else {
      toast({
        title: "Error",
        description: "Failed to create phrases. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <CardHeader className="relative pb-6">
          <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center text-slate-900">Create Your Keyword Phrases</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Keyword</label>
              <Input
                type="text"
                placeholder="Enter your keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="text-center text-lg font-medium"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Sentences</label>
                <Button
                  type="button"
                  onClick={generateExamples}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate Examples
                </Button>
              </div>

              {sentences.map((sentence, index) => (
                <div key={index} className="space-y-1">
                  <label className="text-xs text-slate-500">Sentence {index + 1}</label>
                  <Textarea
                    value={sentence}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={`Write a sentence using "${keyword || "your keyword"}"`}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Phrases
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
function Sonner() {
    return {
        toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
            console.log(`[${variant || "info"}] ${title}: ${description}`);
        },
    };
}

