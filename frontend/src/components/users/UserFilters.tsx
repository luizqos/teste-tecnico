import { FiltersContainer, Input, Select } from "../styles/Users.styles";

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterRole: string;
  onFilterRoleChange: (value: string) => void;
  sortBy: 'id' | 'name';
  onSortByChange: (value: 'id' | 'name') => void;
}

export default function UserFilters({
  search,
  onSearchChange,
  filterRole,
  onFilterRoleChange,
  sortBy,
  onSortByChange,
}: UserFiltersProps) {
  return (
    <FiltersContainer>
      <Input
        placeholder="Buscar por nome ou e-mail"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select value={filterRole} onChange={(e) => onFilterRoleChange(e.target.value)}>
        <option value="">Todos</option>
        <option value="admin">Administrador</option>
        <option value="user">Usuário</option>
      </Select>
      <Select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'id' | 'name')}
      >
        <option value="id">Ordenar por ID</option>
        <option value="name">Ordenar por Nome</option>
      </Select>
    </FiltersContainer>
  );
}
