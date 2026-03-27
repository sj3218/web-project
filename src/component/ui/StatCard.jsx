import React from "react";
import styled from "styled-components";

const CardContainer = styled.div
`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const Card = styled.div
`
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    width: 150px;
    text-align = center;
`;

const Title = styled.p`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const Number = styled.p`
  font-size: 32px;
  font-weight: bold;
  margin: 8px 0 0 0;
  color: #111;
`;

function StatCard({stats})
{
    return(
        <CardContainer>
            {stats.map((stat,index) =>
            (
                <Card key={index}>
                <Title>{stat.title}</Title>
                <Number>{stat.value}</Number>
                </Card>
            ))}
        </CardContainer>
    );
}

export default StatCard;