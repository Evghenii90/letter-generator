import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { TextareaCounter } from '@/entities/TextareaCounter/TextareaCounter.tsx'
import { type FormState } from '@/features/generators/model/type.ts'
import { generatorFormSchema } from '@/features/generators/ui/GeneratorForm/model/shemas/generatorFormSchema.ts'
import {
  selectFormKey,
  selectHasGenerated,
  selectLoading,
  selectTitle,
} from '@/features/generators/ui/GeneratorForm/model/store/selectors.ts'
import { useStore } from '@/features/generators/ui/GeneratorForm/model/store/useStore.ts'
import ArrowRound from '@/shared/assets/icons/arrowRound.svg?react'
import Loader from '@/shared/assets/icons/loader.svg?react'
import { MAX_LENGTH_TEXT_AREA } from '@/shared/constants'
import { Button } from '@/shared/ui/Button/Button.tsx'
import { Input } from '@/shared/ui/Input/Input.tsx'
import { Textarea } from '@/shared/ui/TextArea/Textarea.tsx'
import styles from './GeneratorForm.module.scss'

type GeneratorFormProperties = {
  onSubmit: (data: FormState) => void
  onTitleBlur: (data: FormState) => void
}

const EMPTY_FORM_VALUES: FormState = {
  jobTitle: '',
  company: '',
  skills: '',
  details: '',
}

export const GeneratorForm = ({ onSubmit, onTitleBlur }: GeneratorFormProperties) => {
  const hasGenerated = useStore(selectHasGenerated)
  const title = useStore(selectTitle)
  const formKey = useStore(selectFormKey)
  const loading = useStore(selectLoading)

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormState>({
    defaultValues: EMPTY_FORM_VALUES,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(generatorFormSchema),
  })

  useEffect(() => {
    reset(EMPTY_FORM_VALUES)
  }, [formKey, reset])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} key={formKey}>
      <div className={styles.headWrapper}>
        <h2 className={clsx(styles.head, title !== 'New Applications' && styles.headModified)}>
          {title}
        </h2>
      </div>
      <div className={styles.inputJobCompany}>
        <Input
          type="text"
          label="Job title"
          placeholder="Job title"
          error={errors.jobTitle?.message}
          fullWidth
          {...register('jobTitle', {
            onBlur: () => {
              onTitleBlur(getValues())
            },
          })}
        />
        <Input
          label="Company"
          placeholder="Company"
          error={errors.company?.message}
          fullWidth
          {...register('company', {
            onBlur: () => {
              onTitleBlur(getValues())
            },
          })}
        />
      </div>
      <Input
        className={styles.skills}
        label="I am good at..."
        placeholder="HTML, CSS and doing things in time"
        error={errors.skills?.message}
        fullWidth
        {...register('skills', {
          onBlur: () => {
            onTitleBlur(getValues())
          },
        })}
      />
      <Controller
        name="details"
        control={control}
        render={({ field }) => (
          <>
            <Textarea
              label="Additional details"
              placeholder="Describe why you are a great fit or paste your bio"
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.details?.message}
            />
            <TextareaCounter
              value={field.value ?? ''}
              maxLength={MAX_LENGTH_TEXT_AREA}
              error={errors.details?.message}
            />
          </>
        )}
      />
      {loading && (
        <Button className={styles.loading} aria-label="Loading" type="submit" fullWidth>
          <Loader aria-hidden="true" />
        </Button>
      )}
      {hasGenerated && !loading && (
        <Button
          aria-label="Try again"
          type="submit"
          variant="outline"
          disabled={!isValid || loading}
          fullWidth
        >
          <ArrowRound aria-hidden="true" /> Try again
        </Button>
      )}
      {!hasGenerated && !loading && (
        <Button aria-label="Generate New" type="submit" disabled={!isValid || loading} fullWidth>
          Generate New
        </Button>
      )}{' '}
    </form>
  )
}
