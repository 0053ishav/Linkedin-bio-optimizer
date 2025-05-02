import { LinkedInBioOptimizer } from "@/components/linkedin-bio-optimizer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Bio Optimizer | Generate SEO-Friendly Profiles",
  description:
    "Create professional, keyword-rich LinkedIn profiles that stand out to recruiters and boost your visibility in search results.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a66c2] mb-2">LinkedIn Bio Optimizer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate a professional, SEO-optimized LinkedIn profile that stands out to recruiters and boosts your
            visibility in search results.
          </p>
        </header>

        <LinkedInBioOptimizer />
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Made with ❤️ by Ishav</p>
          <p className="mt-1">
            <a href="https://github.com/0053ishav" className="text-blue-500 hover:text-blue-400 transition-colors">
              GitHub
            </a>
          </p>
        </footer>
    </main>
  )
}
