import { CardInfo, Dashboard } from "../styles/Users.styles";

interface DashboardInfoProps {
  total: number;
  admins: number;
  regular: number;
}

export default function UserDashboardInfo({ total, admins, regular }: DashboardInfoProps) {
  return (
    <Dashboard>
      <CardInfo bg="#0077ff">
        <p>Total Usuários</p>
        <strong>{total}</strong>
      </CardInfo>
      <CardInfo bg="#00b894">
        <p>Admins</p>
        <strong>{admins}</strong>
      </CardInfo>
      <CardInfo bg="#fdcb6e">
        <p>Usuários</p>
        <strong>{regular}</strong>
      </CardInfo>
    </Dashboard>
  );
}
