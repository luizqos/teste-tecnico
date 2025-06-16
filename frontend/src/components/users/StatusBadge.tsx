import { Badge } from "../styles/Users.styles";

interface StatusBadgeProps {
  status?: boolean;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isInactive = !status;
  return (
    <Badge status={isInactive ? 'inativo' : 'ativo'}>
      {isInactive ? 'Inativo' : 'Ativo'}
    </Badge>
  );
}
