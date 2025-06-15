import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Card = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 8px;
  font-size: 32px;
  color: #166534;
  text-align: center;
`;

export const Subtitle = styled.p`
  margin-bottom: 24px;
  color: #666;
  font-size: 16px;
  text-align: center;
`;

export const SectionTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 12px;
  color: #15803d;
  font-size: 18px;
  font-weight: 600;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoItem = styled.div`
  background-color: #f9fafb;
  padding: 10px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #444;
`;

export const Value = styled.span`
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const Button = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  flex: 1;

  &:hover {
    background-color: #005fcc;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;
