import { z } from 'zod'

export const generatorFormSchema = z.object({
  jobTitle: z.string().min(1, 'Required field'),
  company: z.string().min(1, 'Required field'),
  skills: z.string().min(1, 'Required field'),
  details: z.string().min(1, 'Required field').max(1200, 'Maximum length is 1200 characters'),
})
