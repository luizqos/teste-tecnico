import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  padding: 2rem;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 42rem;
  width: 100%;
  padding: 3.5rem;
`;

export const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  color: #065f46;
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div``;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #047857;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  outline: none;

  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 2px #6ee7b7;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #16a34a;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #15803d;
  }
`;

export const Footer = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const Link = styled.a`
  color: #16a34a;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const LoginFormArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #bbf7d0, #d9f99d);
  padding: 2rem;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const ImageArea = styled.div`
  flex: 2;
  background-image: url('/login-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    display: none;
  }
`;