import React from 'react';
import StatCard from '../ui/StatCard';
import LineChart from '../ui/LineChart';

function MainPage(props)
{
    const statsData=[
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

    return(
        <div>
            <h2>대시보드</h2>
            <StatCard stats={statsData} />
            <LineChart data = {defaultData}/>
        </div>
    );
}

export default MainPage;