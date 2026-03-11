import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GeneratedPreview } from '@/features/generators/ui/GeneratedPreview/ui'
import {
  selectCompleteGeneration,
  selectCreateMessage,
  selectCurrentMessageId,
  selectFailGeneration,
  selectLoading,
  selectMessagesCount,
  selectResetForCreateNew,
  selectSetTitle,
  selectStartLoading,
  selectUpdateMessage,
} from '@/features/generators/ui/GeneratorForm/model/store/selectors.ts'
import { useStore } from '@/features/generators/ui/GeneratorForm/model/store/useStore.ts'
import { GeneratorForm } from '@/features/generators/ui/GeneratorForm/ui'
import { DEFAULT_GENERATOR_TITLE, MAX_COUNT_MESSAGES } from '@/shared/constants'
import { Container } from '@/shared/ui/Container/Container.tsx'
import { Banner } from '@/widgets/Banner/Banner.tsx'
import { type FormState } from '../model/type.ts'
import styles from './Generators.module.scss'

export const Generators = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const createMessage = useStore(selectCreateMessage)
  const updateMessage = useStore(selectUpdateMessage)
  const messagesCount = useStore(selectMessagesCount)
  const currentMessageId = useStore(selectCurrentMessageId)
  const loading = useStore(selectLoading)
  const setTitle = useStore(selectSetTitle)
  const startLoading = useStore(selectStartLoading)
  const failGeneration = useStore(selectFailGeneration)
  const completeGeneration = useStore(selectCompleteGeneration)
  const resetForCreateNew = useStore(selectResetForCreateNew)
  const resetTimerReference = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerReference.current !== null) {
        clearTimeout(resetTimerReference.current)
      }
    }
  }, [])

  const handleTitleBlur = (values: FormState) => {
    const job = values.jobTitle.trim()
    const company = values.company.trim()

    if (job && company) {
      setTitle(`${job}, ${company}`)
    } else if (job) {
      setTitle(job)
    } else if (company) {
      setTitle(company)
    } else {
      setTitle(DEFAULT_GENERATOR_TITLE)
    }
  }

  const handleSubmit = async (values: FormState) => {
    if (loading) return

    startLoading()
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        failGeneration('Failed to generate letter. Try again.')
        return
      }

      const data = (await response.json()) as { text?: string }
      if (!data.text) {
        failGeneration('Failed to generate letter. Try again.')
        return
      }
      const generatedTextValue = data.text
      const messageId = currentMessageId ?? crypto.randomUUID()

      if (resetTimerReference.current) {
        clearTimeout(resetTimerReference.current)
      }

      resetTimerReference.current = setTimeout(() => {
        if (currentMessageId) {
          updateMessage(currentMessageId, generatedTextValue)
        } else {
          createMessage({ id: messageId, text: generatedTextValue })
        }

        completeGeneration(generatedTextValue, messageId)
      }, 2500)
    } catch {
      failGeneration('Failed to generate letter. Try again.')
      if (resetTimerReference.current) {
        clearTimeout(resetTimerReference.current)
      }
    }
  }

  const handleCreateNew = useCallback(() => {
    if (resetTimerReference.current) {
      clearTimeout(resetTimerReference.current)
      resetTimerReference.current = null
    }
    resetForCreateNew()
  }, [resetForCreateNew])

  useEffect(() => {
    if (location.state?.createNew) {
      handleCreateNew()
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [handleCreateNew, location.pathname, location.state, navigate])

  return (
    <>
      <Container>
        <div className={styles.content}>
          <GeneratorForm onSubmit={handleSubmit} onTitleBlur={handleTitleBlur} />
          <GeneratedPreview />
        </div>
        {messagesCount < MAX_COUNT_MESSAGES && <Banner onCreateNew={handleCreateNew} />}
      </Container>
    </>
  )
}
