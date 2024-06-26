import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { Form, FormAnnotation } from './styles'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 caracteres' })
    .max(20, { message: 'O usuário deve ter no máximo 20 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve ter no apenas letras e hífens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form
        as='form'
        onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size='sm'
          prefix='ignite.com/'
          placeholder='seu-usuario'
          {...register('username')}
        />

        <Button
          size='sm'
          type='submit'
          disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size='sm'>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
