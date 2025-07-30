"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Hash } from "lucide-react"
import { PhraseWithAudio } from "./PhraseWithAudio"


interface PhraseGroupProps {
  word: string
  phrases: string[]
  isHidden: boolean
  onToggle: () => void
}

export function PhraseGroup({ word, phrases, isHidden, onToggle }: PhraseGroupProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Hash className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{word}</h3>
              <Badge variant="secondary" className="mt-1">
                {phrases.length} phrase{phrases.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>

          <Button onClick={onToggle} variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
            {isHidden ? (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {!isHidden && (
        <CardContent className="p-6">
          <div className="space-y-3">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-200 hover:bg-slate-100 transition-colors duration-150"
              >
                <PhraseWithAudio text={phrase} lang="en-US" />

              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
