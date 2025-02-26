"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { analyzeCode } from "@/api/api";
import SyntaxHighlighter from "react-syntax-highlighter";

interface AnalysisResult {
  complexity: number;
  errors: number;
  readability: number;
  timestamp: string;
}

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Home() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeCode(code);
      const result = { ...response.data, timestamp: new Date().toISOString() };
      setData(response.data);
      setHistory((prev: AnalysisResult[]) => [result, ...prev.slice(0, 4)]); // Keep only the last 5 results
    } catch (error) {
      setError("An error occurred while analyzing the code.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setData(null);
    setError(null);
  };

  return (
    <main className="min-h-screen p-8">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Paste code here..."
          onChange={handleInputChange}
        ></textarea>
        <button
          onClick={handleAnalyze}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {data && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <SyntaxHighlighter
                language="python"
                showLineNumbers={true}
                startingLineNumber={1}
                wrapLines={true}
                lineProps={(lineNumber: number) => {
                  const line = code.split("\n")[lineNumber - 1];
                  const hasError = line ? line.includes(";") : false;
                  console.log(
                    `lineNumber: ${lineNumber}, hasError: ${hasError}`
                  );
                  return hasError ? { style: { background: "#FFF0F0" } } : {};
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <Bar
                data={{
                  labels: ["Code Complexity", "Errors", "Readability"],
                  datasets: [
                    {
                      label: "Code Quality Score",
                      data: data
                        ? [data.complexity, data.errors, data.readability]
                        : [],
                      backgroundColor: ["#4BC0C0", "#FF6384", "#36A2EB"],
                    },
                  ],
                }}
              />
            </div>
          </>
        )}
        {data && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded">
              Complexity: {data.complexity}
            </div>
            <div className="bg-red-50 p-4 rounded">Errors: {data.errors}</div>
            <div className="bg-blue-100 p-4 rounded">
              Readability: {data.readability}
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <Line
              data={{
                labels: history.map((_, i) => `Analysis ${i + 1}`),
                datasets: [
                  {
                    label: "Complexity Trend",
                    data: history.map((r) => r.complexity),
                    borderColor: "#4BC0C0",
                    // fill: false,
                  },
                  {
                    label: "Errors Trend",
                    data: history.map((r) => r.errors),
                    borderColor: "#FF6384",

                    // fill: false,
                  },
                  {
                    label: "Readability Trend",
                    data: history.map((r) => r.readability),
                    borderColor: "#36A2EB",

                    // fill: false,
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
