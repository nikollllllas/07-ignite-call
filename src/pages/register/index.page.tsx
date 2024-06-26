import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/icons/ArrowRight'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve ter no apenas letras e hífens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })
    } catch (e) {
      if (e instanceof AxiosError && e?.response?.data?.message) {
        alert(e.response.data.message)
        return
      }

      console.log(e)
    }
  }

  return (
    <Container>
      <Header>
        <Heading as='strong'>Bem vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações dpeois.
        </Text>

        <MultiStep
          size={4}
          currentStep={1}
        />
      </Header>

      <Form
        as='form'
        onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size='sm'>Nome de usuário</Text>
          <TextInput
            placeholder='seu-usuario'
            prefix='ignite.com/'
            {...register('username')}
          />

          {errors.username && (
            <FormError size='sm'>{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size='sm'>Nome completo</Text>
          <TextInput
            placeholder='Seu nome'
            {...register('name')}
          />

          {errors.username && (
            <FormError size='sm'>{errors.name.message}</FormError>
          )}
        </label>

        <Button
          type='submit'
          disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
