"use client"
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
interface GraphLineChartProps {
    graphData1: any[];
    graphData2: any[];
}

export const GraphBarChart: React.FC<GraphLineChartProps> = ({
    graphData1,
    graphData2
}) =>{
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const data = {
        labels: graphData1.map(item => item.name),
        datasets: [
          {
            label: 'Income',
            data: graphData1.map(item => item.total),
            fill: false,
            backgroundColor: 'rgb(144,238,144)',
            tension: 0.1,
            borderRadius: 8,
          },
          {
            label: 'Expense',
            data: graphData2.map(item => item.total),
            fill: false,
            backgroundColor: 'rgb(240,128,128)',
            tension: 0.1,
            borderRadius: 8,
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: `Transaction Flow ${month}`,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'day'
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Transaction amount'
            }
          },
          
        },
      };
      
      return(
        <div className='flex flex-row justify-center h-full w-full'>
          <Bar data={data} options={options} />
        </div>
      )
}