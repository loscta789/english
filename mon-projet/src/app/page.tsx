"use client"

import { useEffect, useState } from "react"
import { submit } from "@/functions/submit"
import { pull } from "@/functions/pull"
import { CreatePhraseModal } from "@/app/components/create-phrase-modal"
import { PhraseList } from "@/app/components/phrase-list"
import { Button } from "@/components/ui/button"
import { Plus, Eye, EyeOff } from "lucide-react"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [dataMap, setDataMap] = useState<Record<string, string[]>>({})
  const [hiddenAll, setHiddenAll] = useState(false)
  const [hiddenGroups, setHiddenGroups] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await pull()
      if (result) setDataMap(result)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (keyword: string, sentences: string[]) => {
    try {
      const data = await submit(keyword, sentences)
      if (data) {
        await fetchData()
        setOpen(false)
        return true
      }
      return false
    } catch (error) {
      console.error("Failed to submit:", error)
      return false
    }
  }

  const toggleGroupVisibility = (word: string) => {
    setHiddenGroups((prev) => ({ ...prev, [word]: !prev[word] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Phrase Creator</h1>
            <p className="text-slate-600 text-lg">Create and organize sentences with your keywords</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Phrase
            </Button>

            {Object.keys(dataMap).length > 0 && (
              <Button
                onClick={() => setHiddenAll((prev) => !prev)}
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {hiddenAll ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show All Phrases
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide All Phrases
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PhraseList
          dataMap={dataMap}
          hiddenAll={hiddenAll}
          hiddenGroups={hiddenGroups}
          onToggleGroup={toggleGroupVisibility}
          isLoading={isLoading}
        />
      </div>

      {/* Modal */}
      <CreatePhraseModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </div>
  )
}
