import { useAuth } from "../contexts/AuthContext";


export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Meu Perfil</h1>
      <p>ID: {user?.id}</p>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
