import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Container,
  Card,
  Title,
  Subtitle,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonContainer,
  Button,
  Badge,
  ActionButton,
  EmptyMessage,
  CardRow,
  CardItem,
  Modal,
  ModalContent,
  Input,
  ModalActions,
  FiltersContainer,
  Dashboard,
  CardInfo,
  Select,
  CardActions,
} from '../components/styles/Users.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  password?: string;
  status?: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar usuários');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Deseja realmente excluir este usuário?');
    if (!confirm) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir usuário');
    }
  };

  const handleOpenEdit = (user: User) => {
    setEditUser({ ...user, password: '' });
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditUser({ id: 0, name: '', email: '', role: 'user', lastLogin: '', password: '' });
    setIsNew(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setIsModalOpen(false);
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editUser) return;

    const { id, password, ...rest } = editUser;

    try {
      if (isNew) {
        if (!password) {
          alert('Senha é obrigatória para novo usuário');
          return;
        }
        const payload = password ? { ...rest, password } : rest;
        const { data } = await api.post(`/users`, payload);
        setUsers([...users, data]);
      } else {
        const payload = password ? { ...rest, password } : rest;
        const { data } = await api.patch(`/users/${id}`, payload);
        setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)));
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar usuário');
    }
  };

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (filterRole ? u.role === filterRole : true))
    .sort((a, b) => {
      if (sortBy === 'id') return a.id - b.id;
      return a.name.localeCompare(b.name);
    });

  const isInactive = (status?: boolean) => {
    return !status;
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalRegular = users.filter((u) => u.role === 'user').length;

  return (
    <Container>
      <Card>
        <Title>Painel de Usuários</Title>
        <Subtitle>Gerencie os usuários do sistema</Subtitle>

        <Dashboard>
          <CardInfo bg="#0077ff">
            <p>Total Usuários</p>
            <strong>{totalUsers}</strong>
          </CardInfo>
          <CardInfo bg="#00b894">
            <p>Admins</p>
            <strong>{totalAdmins}</strong>
          </CardInfo>
          <CardInfo bg="#fdcb6e">
            <p>Usuários</p>
            <strong>{totalRegular}</strong>
          </CardInfo>
        </Dashboard>

        <FiltersContainer>
          <Input
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuário</option>
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'id' | 'name')}
          >
            <option value="id">Ordenar por ID</option>
            <option value="name">Ordenar por Nome</option>
          </Select>
        </FiltersContainer>
        <ButtonContainer>
          <Button onClick={handleOpenCreate}>
            <FontAwesomeIcon icon={faPlus} /> Novo Usuário
          </Button>
        </ButtonContainer>
        {filteredUsers.length === 0 ? (
          <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>
        ) : (
          <>
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
                {filteredUsers.map((user) => (
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
                    <Td>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : '-'}
                    </Td>
                    <Td>
                      <ActionButton onClick={() => handleOpenEdit(user)}>
                        <FontAwesomeIcon icon={faPen} />
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(user.id)} danger>
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {filteredUsers.map((user) => (
              <CardRow key={user.id}>
                <CardItem>
                  <span>ID</span>
                  <strong>
                    {user.id}
                  </strong>
                </CardItem>
                <CardItem>
                  <span>Status</span>
                  <Badge status={isInactive(user.status) ? "inativo" : "ativo"}>
                    {isInactive(user.status) ? 'Inativo' : 'Ativo'}
                  </Badge>
                </CardItem>
                <CardItem>
                  <span>Nome</span>
                  <strong>{user.name}</strong>
                </CardItem>
                <CardItem>
                  <span>Permissão</span>
                  <strong>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </strong>
                </CardItem>
                <CardItem>
                  <span>Último Login</span>
                  <strong>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : '-'}
                  </strong>
                </CardItem>
                <CardActions>
                  <ActionButton onClick={() => handleOpenEdit(user)}>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(user.id)} danger>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </CardActions>
              </CardRow>
            ))}
          </>
        )}
      </Card>
      {isModalOpen && editUser && (
        <Modal>
          <ModalContent>
            <h2>{isNew ? 'Cadastrar Usuário' : 'Editar Usuário'}</h2>

            <label>Nome</label>
            <Input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />

            <label>Email</label>
            <Input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <label>
              Senha {isNew && <small>(obrigatório)</small>}
            </label>
            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={editUser.password || ''}
                onChange={(e) =>
                  setEditUser({ ...editUser, password: e.target.value })
                }
                placeholder={
                  isNew ? 'Digite a senha' : 'Deixe em branco para manter'
                }
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#555',
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            <label>Permissão</label>
            <Select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </Select>

            <ModalActions>
              <Button onClick={handleSave}>Salvar</Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

    </Container>
  );
}
