import styled from 'styled-components';

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #1e90ff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s ease;

  &:hover {
    color: #3742fa;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Filters = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
`;

export const ChartContainer = styled.div`
  margin-bottom: 3rem;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const Section = styled.section`
  margin-bottom: 2rem;

  p {
    color: #57606f;
    padding: 1rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  th, td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: #f1f2f6;
    color: #2f3542;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f2f6;
  }
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  background-color: #f1f2f6;
  border-radius: 8px;
  transition: background-color 0.3s;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #2f3542;
  }

  span {
    font-size: 1.2rem;
    color: #1e90ff;
  }

  &:hover {
    background-color: #e2e6ea;
  }
`;
