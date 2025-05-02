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

export function generateBio(data: FormData, isFormal: boolean): BioContent {
  // Parse skills into array
  const skillsArray = data.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0)

  // Parse achievements into array
  const achievementsArray = data.achievements
    .split("\n")
    .map((achievement) => achievement.trim())
    .filter((achievement) => achievement.length > 0 && achievement !== "•")
    .map((achievement) => (achievement.startsWith("•") ? achievement.substring(1).trim() : achievement))

  // Generate headline
  const headline = generateHeadline(data.jobTitle, skillsArray, data.industry, data.targetRole)

  // Generate about section
  const about = generateAbout(data, isFormal)

  // Generate hashtags
  const hashtags = generateHashtags(data.industry, skillsArray, data.targetRole)

  return {
    headline,
    about,
    formattedSkills: skillsArray,
    achievements: achievementsArray,
    hashtags,
  }
}

function generateHeadline(jobTitle: string, skills: string[], industry: string, targetRole: string): string {
  // Use current job title or target role if specified
  const primaryTitle = targetRole || jobTitle

  // Select top skills (max 2)
  const topSkills = skills.slice(0, 2)

  // Create headline variations
  const variations = [
    `${primaryTitle} | ${topSkills.join(" & ")} Specialist | ${industry} Professional`,
    `${primaryTitle} | ${topSkills.join(" & ")} Expert | Driving Innovation in ${industry}`,
    `${primaryTitle} with expertise in ${topSkills.join(" & ")} | Helping businesses succeed in ${industry}`,
  ]

  // Randomly select a variation
  return variations[Math.floor(Math.random() * variations.length)]
}

function generateAbout(data: FormData, isFormal: boolean): string {
  const {  jobTitle, industry, skills, targetRole, achievements } = data

  // Extract first name
  // const firstName = name.split(" ")[0]

  // Select top skills (max 3)
  const skillsArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s)
  const topSkills = skillsArray.slice(0, 3).join(", ")

  // Determine career focus
  // const careerFocus = targetRole || jobTitle

  // Has achievements?
  const hasAchievements = achievements.trim().length > 0

  // Generate about section based on tone
  if (isFormal) {
    return `I am a seasoned ${industry} professional with extensive experience as a ${jobTitle}${targetRole ? ` currently targeting roles in ${targetRole}` : ""}. My expertise spans ${topSkills}, enabling me to deliver exceptional results in challenging environments.

With a proven track record of success, I specialize in leveraging my skills to drive innovation and efficiency. I am passionate about ${industry} and continuously seek opportunities to expand my knowledge and capabilities.

I welcome connections with like-minded professionals interested in ${industry} advancements${hasAchievements ? " and am proud of my demonstrated history of achieving measurable results" : ""}.`
  } else {
    return `Hey there! I'm a passionate ${jobTitle} who loves all things ${industry}. I've honed my skills in ${topSkills} and am always excited to tackle new challenges${targetRole ? ` on my journey toward becoming a ${targetRole}` : ""}.

I believe in bringing creativity and strategic thinking to every project I work on. When I'm not immersed in ${industry}, you might find me expanding my knowledge or connecting with other professionals.

Let's connect if you're interested in ${industry} innovations${hasAchievements ? " or want to chat about creating impactful results" : ""}!`
  }
}

function generateHashtags(industry: string, skills: string[], targetRole: string): string[] {
  // Industry hashtags
  const industryTags = industry
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)
    .map((i) => `#${i.replace(/\s+/g, "")}`)

  // Skills hashtags (select top 3)
  const skillTags = skills.slice(0, 3).map((s) => `#${s.replace(/\s+/g, "")}`)

  // Career hashtags
  const careerTags = [
    "#CareerGrowth",
    "#ProfessionalDevelopment",
    targetRole ? `#${targetRole.replace(/\s+/g, "")}` : "#CareerOpportunities",
  ]

  // Combine and limit to 8 hashtags
  return [...industryTags, ...skillTags, ...careerTags]
    .filter((tag, index, self) => self.indexOf(tag) === index) // Remove duplicates
    .slice(0, 8)
}
