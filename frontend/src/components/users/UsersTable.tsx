import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  const isInactive = (status?: boolean) => !status;

  if (users.length === 0) {
    return <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Status</Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Permissão</Th>
          <Th>Último Login</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>
              {isInactive(user.status) ? (
                <Badge status="inativo">Inativo</Badge>
              ) : (
                <Badge status="ativo">Ativo</Badge>
              )}
            </Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</Td>
            <Td>{user.lastLogin ? formatDate(user.lastLogin) : '-'}</Td>
            <Td>
              <ActionButton onClick={() => onEdit(user)}>
                <FontAwesomeIcon icon={faPen} />
              </ActionButton>
              <ActionButton onClick={() => onDelete(user.id)} danger>
                <FontAwesomeIcon icon={faTrash} />
              </ActionButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
