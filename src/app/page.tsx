"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Home() {
  const [code, setCode] = useState('');
  // const [data, setData] = useState<AnalysisResult | null>(null);

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
      <Navbar />
      <h1 className='text-3xl font-bold mb-8'>AI Code Quality Dashboard</h1>
      <div className='max-w-3xl mx-auto mt-8'>
        <textarea className="w-full p-2 border rounded mb-4"
        placeholder="Paste code here..." onChange={(e) => setCode(e.target.value)}>
        </textarea>
        </div>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <Bar data={data} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          Complexity: {data.datasets[0].data[0]}
        </div>
        <div className="bg-green-50 p-4 rounded">
          Errors: {data.datasets[0].data[1]}
          </div>
        <div className="bg-purple-50 p-4 rounded">
          Readability: {data.datasets[0].data[2]}
          </div>
      </div>
    </main>
  );
}
