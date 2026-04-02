import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CustomStackedBarChart({ labels, data }) {
	const colors = ["#e85252", "#6689c6", "#69b3a2", "#e0ac2b"];
	const chartData = {
		labels, //y축
		datasets: data.map((d, i) => ({
			label: d.name,
			data: d.values,
			backgroundColor: colors[i % colors.length],
		})),
	};

	const options = {
		plugins: {
			// title
			legend: {
				position: "top",
			},
		},
		responsive: true,
		maintainAspectRation: false,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	return <Bar data={chartData} options={options} />;
}

export default CustomStackedBarChart;
