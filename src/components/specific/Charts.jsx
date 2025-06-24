import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js"
import { orange, orangeLight, purple, purpleLight } from "../../constants/color";
import { getLastSevenDays } from "../../lib/features";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

const labels = getLastSevenDays();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,

            grid: {
                display: false
            },
            display: false
        }
    }
}

const LineChart = ({ value }) => {
    const data = {
        labels,
        datasets: [
            {
                label: "Messages",
                fill: false,
                backgroundColor: purpleLight,
                borderColor: purple,
                data: value,
            },

        ],
    }



    return <Line data={data} options={lineChartOptions} />
}

const doughNutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    cutout: 10
}

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                backgroundColor: [purpleLight, orangeLight],
                hoverBackgroundColor: [purple, orange],
                borderColor: [purple, orange],
                data: value,
                offset: 20
            },

        ],
    }



    return <Doughnut style={{ zIndex: 10 }} data={data} options={doughNutChartOptions} />
}

export { LineChart, DoughnutChart };