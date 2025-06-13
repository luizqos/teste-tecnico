import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Meu Perfil</h2>
      {user && (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Permissão: {user.role}</p>
        </div>
      )}
    </div>
  );
}