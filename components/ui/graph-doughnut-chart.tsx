"use client"
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
interface GraphDoughnutChartProps {
    graphData1: any[];
    graphData2: any[];
}

export const GraphDoughnutChart: React.FC<GraphDoughnutChartProps> = ({
    graphData1,
    graphData2
}) =>{
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const totalIncome = graphData1.reduce((result,item)=>result + item.total,0)
    const totalExpense = graphData2.reduce((result,item)=>result + item.total,0)
    const data = {
        datasets: [
          {
            label: 'Income',
            data: [totalIncome,totalExpense],
            fill: false,
            backgroundColor: ['rgb(144,238,144)','rgb(240,128,128)'],
            tension: 0.1,
            borderRadius: 8,
          },
        ],
        
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
      
      return(
        <div className='flex flex-col justify-center p-4'>
          <div>
            <h1>Doughnut Chart</h1>
          </div>
          <div className='h-[120px]'>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      )
}