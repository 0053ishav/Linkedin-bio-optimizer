"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type KeywordDensityProps = {
  bioContent: {
    headline: string
    about: string
    formattedSkills: string[]
    achievements: string[]
    hashtags: string[]
  }
}

export function KeywordDensity({ bioContent }: KeywordDensityProps) {
  const getKeywordDensity = () => {
    // Combine all text content
    const allText = `
      ${bioContent.headline}
      ${bioContent.about}
      ${bioContent.formattedSkills.join(" ")}
      ${bioContent.achievements.join(" ")}
      ${bioContent.hashtags.join(" ")}
    `.toLowerCase()

    // Remove special characters and split into words
    const words = allText.replace(/[^\w\s]/g, "").split(/\s+/)

    // Count word frequency
    const wordCount: Record<string, number> = {}
    words.forEach((word) => {
      // Ignore common words and short words
      if (word.length > 2 && !["and", "the", "for", "with", "that", "this", "have", "from"].includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1
      }
    })

    // Sort by frequency
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // Calculate percentages
    const totalKeywords = sortedWords.reduce((sum, [_, count]) => sum + count, 0)

    return sortedWords.map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / totalKeywords) * 100),
    }))
  }

  const keywords = getKeywordDensity()

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Keyword Density</h3>

      <div className="space-y-4">
        {keywords.map((keyword, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium capitalize">{keyword.word}</span>
              <span className="text-sm text-gray-500">{keyword.percentage}%</span>
            </div>
            <Progress value={keyword.percentage} className="h-2" />
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        These keywords appear most frequently in your profile and will help with LinkedIn SEO.
      </p>
    </Card>
  )
}
