function asText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function generateMockCoverLetter({ jobTitle, company, skills, details }) {
  return `Dear Hiring Manager at ${company},
  
I am writing to apply for the position of ${jobTitle}.
I have hands-on experience with ${skills}, and I am confident that my background allows me to contribute effectively to your team.
${details}
I am motivated, responsible, and eager to grow professionally at ${company}.
Thank you for your time and consideration.
  
Sincerely,
Evghenii L.`.trim()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const jobTitle = asText(req.body?.jobTitle)
    const company = asText(req.body?.company)
    const skills = asText(req.body?.skills)
    const details = asText(req.body?.details)

    if (!jobTitle || !company || !skills || !details) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const text = generateMockCoverLetter({
      jobTitle,
      company,
      skills,
      details,
    })

    return res.status(200).json({ text })
  } catch (error) {
    console.error('Generation failed:', error)
    return res.status(500).json({ error: 'Generation failed' })
  }
}
