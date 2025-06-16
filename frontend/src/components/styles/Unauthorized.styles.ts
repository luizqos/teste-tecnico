import styled, { keyframes } from 'styled-components';

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  padding: 4rem;
  text-align: center;
  background-color: #f8f9fa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: #ffa502;
  animation: ${pulse} 2s infinite;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #57606f;
  margin: 1rem 0 2rem 0;
`;
