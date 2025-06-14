import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Title,
  Subtitle,
  InfoContainer,
  InfoItem,
  Label,
  Value,
  ButtonContainer,
  Button,
} from '../components/styles/Profile.styles';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Card>
        <Title>Bem-vindo, {user?.name}</Title>
        <Subtitle>Veja seus dados abaixo:</Subtitle>

        <InfoContainer>
          <InfoItem>
            <Label>Nome:</Label>
            <Value>{user?.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email:</Label>
            <Value>{user?.email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Permissão:</Label>
            <Value>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</Value>
          </InfoItem>
        </InfoContainer>

        <ButtonContainer>
          <Button onClick={handleLogout}>Sair</Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
}
