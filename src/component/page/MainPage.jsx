import React from 'react';
import styled from 'styled-components';
import StatCard from '../ui/StatCard';
import LineChart from '../ui/LineChart';

const DashboardWrapper = styled.div`
  padding: 20px;
`;

const CardsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`;

function MainPage() {
    const statsData = [
        { title: '가맹점 수', value: 124 },
        { title: '회원 수', value: 532 },
        { title: '주문 수', value: 89 },
    ];

    const defaultData = [
        { country: "USA", coal: 100, oil: 150, gas: 80 },
        { country: "China", coal: 180, oil: 100, gas: 50 },
        { country: "India", coal: 120, oil: 60, gas: 30 },
        { country: "Germany", coal: 50, oil: 70, gas: 40 },
    ];

    return (
        <DashboardWrapper>
            <h2>대시보드</h2>

            {/* 카드들 */}
            <CardsRow>
                <StatCard stats={statsData} />
            </CardsRow>

            {/* 그래프 */}
            <ChartWrapper>
                <LineChart data={defaultData} />
            </ChartWrapper>
        </DashboardWrapper>
    );
}

export default MainPage;