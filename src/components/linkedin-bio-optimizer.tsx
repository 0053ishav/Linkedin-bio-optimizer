"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, CheckCircle2, AlertCircle } from "lucide-react"
import { ProfilePreview } from "@/components/profile-preview"
import { KeywordDensity } from "@/components/keyword-density"
import { generateBio } from "@/lib/bio-generator"

type FormData = {
  name: string
  jobTitle: string
  industry: string
  skills: string
  targetRole: string
  achievements: string
}

type BioContent = {
  headline: string
  about: string
  formattedSkills: string[]
  achievements: string[]
  hashtags: string[]
}

export function LinkedInBioOptimizer() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    jobTitle: "",
    industry: "",
    skills: "",
    targetRole: "",
    achievements: "",
  })

  const [isFormal, setIsFormal] = useState(true)
  const [bioContent, setBioContent] = useState<BioContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("form")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = generateBio(formData, isFormal)
      setBioContent(result)
      setIsGenerating(false)
      setActiveTab("results")
    }, 1500)
  }

  const copyToClipboard = () => {
    if (!bioContent) return

    const fullBio = `
${bioContent.headline}

${bioContent.about}

Skills:
${bioContent.formattedSkills.join(", ")}

${bioContent.achievements.length > 0 ? `Achievements:\n${bioContent.achievements.join("\n")}\n` : ""}

${bioContent.hashtags.join(" ")}
    `.trim()

    navigator.clipboard.writeText(fullBio)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isFormValid = () => {
    return formData.name && formData.jobTitle && formData.industry && formData.skills
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="form">Input Information</TabsTrigger>
          <TabsTrigger value="results" disabled={!bioContent}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">
                    Current Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Senior Software Engineer"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="industry"
                  name="industry"
                  placeholder="Technology, Healthcare, Finance, etc."
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">
                  Skills <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="JavaScript, React, Project Management, etc. (comma-separated)"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Job Role (optional)</Label>
                <Input
                  id="targetRole"
                  name="targetRole"
                  placeholder="Product Manager, CTO, etc."
                  value={formData.targetRole}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements (optional)</Label>
                <Textarea
                  id="achievements"
                  name="achievements"
                  placeholder="• Increased revenue by 30%
• Led a team of 10 engineers
• Launched 5 successful products"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="tone" checked={isFormal} onCheckedChange={setIsFormal} />
                <Label htmlFor="tone" className="cursor-pointer">
                  {isFormal ? "Formal Tone" : "Casual Tone"}
                </Label>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid() || isGenerating}
                className="w-full bg-[#0a66c2] hover:bg-[#084b8a]"
              >
                {isGenerating ? "Generating..." : "Generate LinkedIn Bio"}
              </Button>
            </div>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fields marked with <span className="text-red-500">*</span> are required for optimal results.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {bioContent && (
            <>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#0a66c2]">Your Optimized LinkedIn Bio</h2>
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy All</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Headline</h3>
                    <p className="font-medium">{bioContent.headline}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">About</h3>
                    <p className="whitespace-pre-line">{bioContent.about}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {bioContent.formattedSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {bioContent.achievements.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Achievements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {bioContent.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {bioContent.hashtags.map((tag, index) => (
                        <span key={index} className="text-[#0a66c2]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <KeywordDensity bioContent={bioContent} />
                <ProfilePreview bioContent={bioContent} name={formData.name} />
              </div>

              <Card className="p-6 border-2 border-dashed border-[#0a66c2] bg-blue-50">
                <h2 className="text-xl font-bold text-[#0a66c2] mb-4">Upgrade for Premium Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-2">Advanced AI Rewrites</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get multiple AI-powered variations of your bio tailored for different audiences and platforms.
                    </p>
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-2">A/B Test Versions</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Test different versions of your profile to see which performs better with recruiters.
                    </p>
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center">
                <Button variant="outline" onClick={() => setActiveTab("form")} className="mt-4">
                  Back to Editor
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
