import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { useState } from 'react';
import useChartData from './useChartData';

const COLORS = ['#3b82f6', '#eab308', '#8b5cf6', '#10b981'];

const renderActiveShape = (props) => {
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
    } = props;

    return (
        <g>
            {/* 강조된 섹션 */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8} // hover 시 커짐
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            {/* 중앙 텍스트 */}
            <text x={cx} y={cy - 5} textAnchor="middle" fontSize={18}>
                {payload.name}
            </text>
            <text
                x={cx}
                y={cy + 15}
                textAnchor="middle"
                fontSize={14}
                fill="#666"
            >
                {payload.count}건 ({(percent * 100).toFixed(0)}%)
            </text>
        </g>
    );
};

export default function DonutChart() {
    const data = useChartData();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div
            style={{
                background: '#f5f6f8',
                borderRadius: 20,
                padding: 30,
                width: 500,
            }}
        >
            <h3 style={{ marginBottom: 20 }}>채널별 접수 비중</h3>

            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    dataKey="value"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                {/* 기본 tooltip */}
                <Tooltip
                    formatter={(value, name, props) => [
                        `${props.payload.count}건`,
                        name,
                    ]}
                />
            </PieChart>

            {/* 하단 리스트 */}
            <div style={{ marginTop: 20 }}>
                {data.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 6,
                        }}
                    >
                        <span>{item.name}</span>
                        <span>{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
