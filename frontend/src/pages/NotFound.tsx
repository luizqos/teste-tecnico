import { Link} from 'react-router-dom';
import { Container, Title,  Subtitle } from '../components/styles/NotFound.styles';

export default function NotFound() {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Ops! A página que você procura não foi encontrada.</Subtitle>
      <Link to="/">Voltar para o início</Link>
    </Container>
  );
}
