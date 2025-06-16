import {
  CardRow,
  CardItem,
  CardActions,
  Badge,
  ActionButton,
  EmptyMessage,
} from '../styles/Users.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/formatDate';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status?: boolean;
}

interface UsersCardRowProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UsersCardRow({ users, onEdit, onDelete }: UsersCardRowProps) {
  const isInactive = (status?: boolean) => !status;

  if (users.length === 0) {
    return <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>;
  }

  return (
    <>
      {users.map((user) => (
        <CardRow key={user.id}>
          <CardItem>
            <span>ID</span>
            <strong>{user.id}</strong>
          </CardItem>
          <CardItem>
            <span>Status</span>
            <Badge status={isInactive(user.status) ? 'inativo' : 'ativo'}>
              {isInactive(user.status) ? 'Inativo' : 'Ativo'}
            </Badge>
          </CardItem>
          <CardItem>
            <span>Nome</span>
            <strong>{user.name}</strong>
          </CardItem>
          <CardItem>
            <span>Email</span>
            <strong>{user.email}</strong>
          </CardItem>
          <CardItem>
            <span>Permissão</span>
            <strong>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</strong>
          </CardItem>
          <CardItem>
            <span>Último Login</span>
            <strong>{user.lastLogin ? formatDate(user.lastLogin) : '-'}</strong>
          </CardItem>
          <CardActions>
            <ActionButton onClick={() => onEdit(user)}>
              <FontAwesomeIcon icon={faPen} />
            </ActionButton>
            <ActionButton onClick={() => onDelete(user.id)} danger>
              <FontAwesomeIcon icon={faTrash} />
            </ActionButton>
          </CardActions>
        </CardRow>
      ))}
    </>
  );
}
