import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001, () => {
  console.log('Mock AI server running on http://localhost:3001')
})

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
app.post('/api/generate', async (req, res) => {
  try {
    const { jobTitle, company, skills, details } = req.body

    if (!jobTitle || !company) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // задержкa AI
    await new Promise((r) => setTimeout(r, 2000))

    const text = generateMockCoverLetter({
      jobTitle,
      company,
      skills,
      details,
    })

    res.json({ text })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Generation failed' })
  }
})
