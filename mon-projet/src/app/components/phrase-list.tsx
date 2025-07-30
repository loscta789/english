"use client"

import { PhraseGroup } from "./phrase-group"
import { Card } from "@/components/ui/card"
import { Loader2, BookOpen } from "lucide-react"

interface PhraseListProps {
  dataMap: Record<string, string[]>
  hiddenAll: boolean
  hiddenGroups: Record<string, boolean>
  onToggleGroup: (word: string) => void
  isLoading: boolean
}

export function PhraseList({ dataMap, hiddenAll, hiddenGroups, onToggleGroup, isLoading }: PhraseListProps) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span className="text-slate-600">Loading your phrases...</span>
        </div>
      </Card>
    )
  }

  if (Object.entries(dataMap).length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No phrases yet</h3>
          <p className="text-slate-500">Create your first keyword phrase to get started!</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Phrase Collection</h2>
        <p className="text-slate-600">
          {Object.keys(dataMap).length} keyword{Object.keys(dataMap).length !== 1 ? "s" : ""} •{" "}
          {Object.values(dataMap).flat().length} phrase{Object.values(dataMap).flat().length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(dataMap).map(([word, phrases]) => (
          <PhraseGroup
            key={word}
            word={word}
            phrases={phrases}
            isHidden={hiddenAll || hiddenGroups[word]}
            onToggle={() => onToggleGroup(word)}
          />
        ))}
      </div>
    </div>
  )
}
