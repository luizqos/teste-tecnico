import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #166534;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;

  &:focus {
    border-color: #22c55e;
    outline: none;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
  }

  @media (max-width: 480px) {
    padding: 0.65rem 0.9rem;
    font-size: 0.95rem;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #16a34a;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 0.65rem;
    font-size: 0.95rem;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }
`;
