import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f0f4f8;
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  width: 95%;

    @media (max-width: 768px) {
  width: 100%;
  }
`;

export const Title = styled.h1`
  margin-bottom: 8px;
  font-size: 32px;
  color: #222;
`;

export const Subtitle = styled.p`
  margin-bottom: 24px;
  color: #666;
  font-size: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Thead = styled.thead`
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  color: #000;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eaeaea;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #999;
  margin: 20px 0;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: left;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #005fcc;
  }
`;

export const ActionButton = styled.button<{ danger?: boolean }>`
  background-color: ${(props) => (props.danger ? '#e17055' : '#0984e3')};
  color: white;
  border: none;
  padding: 6px 10px;
  margin-right: 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${(props) => (props.danger ? '#d63031' : '#74b9ff')};
  }

  @media (max-width: 600px) {
    padding: 6px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 24px;
    font-weight: 700;
  }

  label {
    font-size: 14px;
    color: #374151;
    margin-bottom: 4px;
    font-weight: 500;
  }

  input, select {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: #f9fafb;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-size: 14px;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
      outline: none;
    }
  }
`;


export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

export const Dashboard = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const CardInfo = styled.div<{ bg: string }>`
  background-color: ${(props) => props.bg};
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  p {
    margin: 0;
    font-size: 14px;
  }

  strong {
    font-size: 24px;
    margin-top: 5px;
  }
`;

export const CardRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  }
`;

export const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }

  span {
    color: #555;
    font-weight: 500;
  }

  strong {
    color: #222;
  }
`;

export const CardActions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;


export const Badge = styled.span<{ status: 'ativo' | 'inativo' }>`
  background-color: ${(props) => (props.status === 'ativo' ? '#22c55e' : '#ef4444')}; 
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 4px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0077ff;
  }
`;

export const CardList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;