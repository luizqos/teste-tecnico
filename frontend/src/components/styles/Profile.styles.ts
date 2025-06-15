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
  width: 100%;
  max-width: 500px;
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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoItem = styled.div`
  background-color: #f9fafb;
  padding: 12px 16px;
  border-radius: 10px;
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

export const ButtonContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
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
