import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CustomDoughnutChart({ data, size = 250 }) {
	const chartData = {
		labels: data.map((d) => d.name),
		datasets: [
			{
				data: data.map((d) => d.value),
				backgroundColor: ["#e85252", "#6689c6", "#69b3a2", "#e0ac2b"],
				borderWidth: 0,
			},
		],
	};
	const options = {
		responsive: true,
		maintainAspectRatio: false, // 부모 div 크기에 맞춰 차트 조정
		cutout: "75%", // inner radius 비율
		plugins: {
			legend: { display: false }, // 카드 안에서는 리스트로 표시
			tooltip: { enabled: true },
		},
	};
	return <Doughnut data={chartData} options={options} width={size} height={size} />;
	// width={size} height={size}
}
export default CustomDoughnutChart;
