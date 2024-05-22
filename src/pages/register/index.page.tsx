import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, Header } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/icons/ArrowRight'

export default function Register() {
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

      <Form as='form'>
        <label>
          <Text size='sm'>Nome de usuário</Text>
          <TextInput
            placeholder='seu-usuario'
            prefix='ignite.com/'
          />
        </label>

        <label>
          <Text size='sm'>Nome completo</Text>
          <TextInput placeholder='Seu nome' />
        </label>

        <Button>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
