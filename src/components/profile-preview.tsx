"use client"

import { Card } from "@/components/ui/card"
import { User } from "lucide-react"

type ProfilePreviewProps = {
  bioContent: {
    headline: string
    about: string
    formattedSkills: string[]
    achievements: string[]
    hashtags: string[]
  }
  name: string
}

export function ProfilePreview({ bioContent, name }: ProfilePreviewProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">LinkedIn Preview</h3>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0a66c2] h-24 relative">
          <div className="absolute -bottom-12 left-4">
            <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-4 pb-4">
          <h4 className="font-bold text-xl">{name}</h4>
          <p className="text-sm text-gray-700">{bioContent.headline}</p>

          <div className="mt-4 text-xs text-gray-500">
            <p>500+ connections</p>
          </div>

          <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs">
            <p className="font-medium mb-1">About</p>
            <p className="text-gray-700 line-clamp-3">{bioContent.about}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
