import { Container, Title, Subtitle } from "../components/styles/Unauthorized.styles";
import { Link } from 'react-router-dom';
export default function Unauthorized() {
  return (
    <Container>
      <Title>403</Title>
      <Subtitle>Você não tem permissão para acessar esta página.</Subtitle>
      <Link to="/">Voltar para o início</Link>
    </Container>
  );
}
