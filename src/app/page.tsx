"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Home() {
  const data = {
    labels: ["Code Complexity", "Errors", "Readability"],
    datasets: [{
      label: 'Code Quality Score',
      data: [6.2, 3, 8.5],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#4BC0C0'
      ]
    }]
  };
  
  return (
    <main className='min-h-screen p-8'>
      <h1 className='text-3xl font-bold mb-8'>AI Code Quality Dashboard</h1>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <Bar data={data} />
        </div>
      </div>
    </main>
  );
}
