import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false

        }
    },
    scales: {
        x: {
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: 'black'
            }
        },
        y: {
            beginAtZero: true,
            min:0,
            max:10000,
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
                color: 'black',
                stepSize: 1000
            }
        }
    }
};

const LineLumen = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchLumen = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/line/node1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);

        // Process the data here and set it to chartData state
        let labels = data.data_sensor.map(item => item.time);
        let lumen = data.data_sensor.map(item => item.lumen);
 
        labels = labels.reverse()
        lumen = lumen.reverse()

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Lumen',
              data: lumen,
              borderColor: 'green',
              borderWidth: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: 'green',
              pointBorderWidth: 2,
              pointRadius: 3,
              fill: false,
              tension: 0.1
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLumen();
  }, []);

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default LineLumen;
