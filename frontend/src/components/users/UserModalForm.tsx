import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  Input,
  RadioGroup,
  RadioLabel,
  Select,
  ModalActions,
  Button,
} from '../styles/Users.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  password?: string;
  status?: boolean;
}

interface Props {
  isOpen: boolean;
  user: User | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function UserModalForm({ isOpen, user, isNew, onClose, onSave }: Props) {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handleChange = (key: keyof User, value: string | boolean) => {
    if (localUser) {
      setLocalUser({ ...localUser, [key]: value });
    }
  };

  const handleSubmit = () => {
    if (!localUser) return;
    if (isNew && !localUser.password) {
      alert('Senha é obrigatória para novo usuário');
      return;
    }
    onSave(localUser);
  };

  if (!isOpen || !localUser) return null;

  return (
    <Modal>
      <ModalContent>
        <h2>{isNew ? 'Cadastrar Usuário' : 'Editar Usuário'}</h2>

        <label>Nome</label>
        <Input
          value={localUser.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <label>Email</label>
        <Input
          value={localUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <label>
          Senha {isNew && <small>(obrigatório)</small>}
        </label>
        <div style={{ position: 'relative' }}>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={localUser.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder={isNew ? 'Digite a senha' : 'Deixe em branco para manter'}
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

        <label>Status</label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="ativo"
              checked={localUser.status === true}
              onChange={() => handleChange('status', true)}
            />
            Ativo
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="inativo"
              checked={localUser.status === false}
              onChange={() => handleChange('status', false)}
            />
            Inativo
          </RadioLabel>
        </RadioGroup>

        <label>Permissão</label>
        <Select
          value={localUser.role}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </Select>

        <ModalActions>
          <Button onClick={handleSubmit}>Salvar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
}
