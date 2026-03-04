import react from '@vitejs/plugin-react-swc'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

type RequestPayload = {
  jobTitle?: unknown
  company?: unknown
  skills?: unknown
  details?: unknown
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function generateMockCoverLetter(payload: RequestPayload): string {
  const jobTitle = asText(payload.jobTitle)
  const company = asText(payload.company)
  const skills = asText(payload.skills)
  const details = asText(payload.details)

  return `Dear Hiring Manager at ${company},
  
I am writing to apply for the position of ${jobTitle}.
I have hands-on experience with ${skills}, and I am confident that my background allows me to contribute effectively to your team.
${details}
I am motivated, responsible, and eager to grow professionally at ${company}.
Thank you for your time and consideration.
  
Sincerely,
Evghenii L.`.trim()
}

function readJsonBody(req: IncomingMessage): Promise<RequestPayload> {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        resolve(body ? (JSON.parse(body) as RequestPayload) : {})
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function installLocalApi(middlewares: {
  use: (
    route: string,
    handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void,
  ) => void
}) {
  middlewares.use('/api/generate', async (req, res, next) => {
    if (req.method !== 'POST') {
      next()
      return
    }

    try {
      const payload = await readJsonBody(req)
      const jobTitle = asText(payload.jobTitle)
      const company = asText(payload.company)
      const skills = asText(payload.skills)
      const details = asText(payload.details)

      if (!jobTitle || !company || !skills || !details) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Missing required fields' }))
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1200))

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ text: generateMockCoverLetter(payload) }))
    } catch {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Generation failed' }))
    }
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: 'local-mock-api',
      configureServer(server) {
        installLocalApi(server.middlewares)
      },
      configurePreviewServer(server) {
        installLocalApi(server.middlewares)
      },
    },
  ],
})
