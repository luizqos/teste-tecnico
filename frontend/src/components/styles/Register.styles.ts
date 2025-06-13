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

  input {
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
  }

  button {
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

    @media (max-width: 480px) {
      padding: 0.65rem;
      font-size: 0.95rem;
    }
  }
`;
