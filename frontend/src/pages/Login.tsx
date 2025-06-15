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
  PasswordWrapper,
  TogglePasswordButton,
} from '../components/styles/Login.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
              <PasswordWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '40px' }}
                />
                <TogglePasswordButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </TogglePasswordButton>
              </PasswordWrapper>
            </FormGroup>

            <Button type="submit">Entrar</Button>
          </Form>

          <Footer>
            Ainda não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </Footer>
        </Card>
      </LoginFormArea>

    </Wrapper>
  );
}
