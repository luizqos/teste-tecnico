import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import api from '../services/api';

import {
  Wrapper,
  Card,
  PasswordWrapper,
  TogglePasswordButton,
  StyledInput,
  StyledButton,
} from '../components/styles/Register.styles';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'user',
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao cadastrar.');
    }
  };

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    password === confirmPassword;

  return (
    <Wrapper>
      <Card>
        <h2>Cadastro</h2>

        <StyledInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />

        <StyledInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />

        <PasswordWrapper>
          <StyledInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <TogglePasswordButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
        </PasswordWrapper>

        <PasswordWrapper>
          <StyledInput
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Senha"
            required
          />
          <TogglePasswordButton
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
        </PasswordWrapper>

        <StyledButton
          onClick={handleRegister}
          disabled={!isFormValid}
        >
          Cadastrar
        </StyledButton>
      </Card>
    </Wrapper>
  );
}
