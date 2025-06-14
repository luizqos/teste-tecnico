import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Wrapper,
  LoginFormArea,
  Card,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Footer,
  Link,
} from '../components/styles/Login.styles';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Wrapper>
      <LoginFormArea>
        <Card>
          <Title>Bem-vindo</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button type="submit">Entrar</Button>
          </Form>

          <Footer>
            Ainda não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </Footer>
        </Card>
      </LoginFormArea>

      {/* <ImageArea /> */}
    </Wrapper>
  );
}
