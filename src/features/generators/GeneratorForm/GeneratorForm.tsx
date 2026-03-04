import { type ChangeEvent, type SyntheticEvent } from 'react'

import { clsx } from 'clsx'

import { Button } from '../../../shared/ui/Button/Button'
import { Input } from '../../../shared/ui/Input/Input'
import { Textarea } from '../../../shared/ui/TextArea/Textarea'
import { type FormState } from '../type'
import ArrowRound from './../../../shared/assets/icons/arrowRound.svg?react'
import Loader from './../../../shared/assets/icons/loader.svg?react'
import s from './GeneratorForm.module.css'

type GeneratorFormProps = {
  title: string
  formData: FormState
  errors: {
    jobTitle: string
    company: string
    skills: string
  }
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onInputBlur: (name: 'jobTitle' | 'company' | 'skills') => void
  onTextareaChange: (value: string) => void
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void
  canGenerateMore: boolean
  onTitleBlur: () => void
  loading: boolean
}

export const GeneratorForm = ({
  title,
  formData,
  errors,
  onInputChange,
  onInputBlur,
  onTextareaChange,
  onSubmit,
  canGenerateMore,
  onTitleBlur,
  loading,
}: GeneratorFormProps) => {
  const isFormValid =
    formData.jobTitle.trim() &&
    formData.company.trim() &&
    formData.skills.trim() &&
    formData.details.trim() &&
    formData.details.length <= 1200

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.headWrapper}>
        <h2 className={clsx(s.head, title !== 'New Applications' && s.headModified)}>{title}</h2>
      </div>
      <div className={s.inputJobCompany}>
        <Input
          label="Job title"
          name="jobTitle"
          id="jobTitle"
          placeholder="Job title"
          value={formData.jobTitle}
          error={errors.jobTitle}
          onChange={onInputChange}
          onBlur={() => {
            onInputBlur('jobTitle')
            onTitleBlur()
          }}
        />
        <Input
          label="Company"
          name="company"
          id="company"
          placeholder="Company"
          value={formData.company}
          error={errors.company}
          onChange={onInputChange}
          onBlur={() => {
            onInputBlur('company')
            onTitleBlur()
          }}
        />
      </div>

      <Input
        label="I am good at..."
        name="skills"
        id="skills"
        placeholder="HTML, CSS and doing things in time"
        value={formData.skills}
        error={errors.skills}
        onChange={onInputChange}
        onBlur={() => onInputBlur('skills')}
        fullWidth
      />

      <Textarea value={formData.details} onChange={onTextareaChange} />

      {canGenerateMore ? (
        <Button type="submit" variant="generate" disabled={!isFormValid && !loading} fullWidth>
          {loading ? <Loader /> : 'Generate New'}
        </Button>
      ) : (
        <Button
          type="submit"
          variant={loading ? 'generate' : 'generate-try-again'}
          disabled={!isFormValid}
          fullWidth
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <ArrowRound /> Try again
            </>
          )}
        </Button>
      )}
    </form>
  )
}
