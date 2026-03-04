import { type ChangeEvent, type SyntheticEvent, useEffect, useRef, useState } from 'react'

import { useCopyToClipboard } from '../../shared/lib/hooks/useCopyMessage'
import { generateCoverLetter } from '../../shared/lib/utils/generateCoverLetter'
import { Banner } from '../../shared/ui/Banner/Banner'
import { Container } from '../../shared/ui/Container/Container'
import { useStore } from '../../store/useStore'
import { GeneratedPreview } from './GeneratedPreview/GeneratedPreview'
import { GeneratorForm } from './GeneratorForm/GeneratorForm'
import s from './Generators.module.css'
import { type FormState } from './type'

export const Generators = () => {
  const { state, dispatch } = useStore()

  const [formData, setFormData] = useState<FormState>({
    jobTitle: '',
    company: '',
    skills: '',
    details: '',
  })
  const [generatedText, setGeneratedText] = useState('')
  const { isCopied, copy } = useCopyToClipboard()
  const [title, setTitle] = useState('New Applications')

  const [loading, setLoading] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleTitleBlur = () => {
    const job = formData.jobTitle.trim()
    const company = formData.company.trim()

    if (job && company) {
      setTitle(`${job}, ${company}`)
    } else if (job) {
      setTitle(job)
    } else if (company) {
      setTitle(company)
    } else {
      setTitle('New Applications')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleTextareaChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      details: value,
    }))
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    const generatedTextMessage = generateCoverLetter(formData)
    setGeneratedText(generatedTextMessage)
    dispatch({
      type: 'CREATE_MESSAGE',
      payload: { id: crypto.randomUUID(), text: generatedTextMessage },
    })
    setTitle('New Applications')
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }
    resetTimerRef.current = setTimeout(() => {
      setLoading(false)
      setFormData({ jobTitle: '', company: '', skills: '', details: '' })
    }, 3000)
  }

  return (
    <>
      <Container>
        <div className={s.content}>
          <GeneratorForm
            title={title}
            formData={formData}
            onInputChange={handleInputChange}
            onTextareaChange={handleTextareaChange}
            onSubmit={handleSubmit}
            canGenerateMore={state.length < 5}
            onTitleBlur={handleTitleBlur}
            loading={loading}
          />
          <GeneratedPreview
            loading={loading}
            text={generatedText}
            isCopied={isCopied}
            onCopy={() => copy(generatedText)}
          />
        </div>
        {state.length < 5 && <Banner />}
      </Container>
    </>
  )
}
