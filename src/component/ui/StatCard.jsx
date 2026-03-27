import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 1;
  min-width: 120px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 14px;
  color: #555;
`;

const Value = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

export default function StatCard({ stats }) {
  return (
    <CardContainer>
      {stats.map((s, idx) => (
        <Card key={idx}>
          <Title>{s.title}</Title>
          <Value>{s.value}</Value>
        </Card>
      ))}
    </CardContainer>
  );
}