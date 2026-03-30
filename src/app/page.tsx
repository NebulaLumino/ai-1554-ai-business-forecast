"use client";
import { useState } from "react";

export default function BusinessForecastPage() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [growthRate, setGrowthRate] = useState("15");
  const [seasonality, setSeasonality] = useState("Minimal seasonality");
  const [taxRate, setTaxRate] = useState("25");
  const [costOfGoods, setCostOfGoods] = useState("");
  const [employees, setEmployees] = useState("");
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revenue, expenses, growthRate, seasonality, taxRate, costOfGoods, employees, notes }),
      });
      const data = await res.json();
      setOutput(data.output || "No output generated.");
    } catch { setOutput("Error generating business forecast."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "hsl(15deg, 70%, 55%)" }}>AI Business Forecast Analyzer</h1>
          <p className="text-gray-400">Project revenue, cash flow, and growth with AI-powered forecasting</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-3">Business Financials</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Annual Revenue ($)</label>
                  <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="500000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Annual Expenses ($)</label>
                  <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="380000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Cost of Goods / COGS ($)</label>
                  <input type="number" value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)} placeholder="150000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Projected Growth Rate (%)</label>
                  <input type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} placeholder="15" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Seasonality</label>
                  <select value={seasonality} onChange={(e) => setSeasonality(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm">
                    <option>Minimal seasonality</option><option>Q4 peak (retail)</option>
                    <option>Q1-Q2 peak (B2B)</option><option>Summer slowdown</option>
                    <option>Highly seasonal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Tax Rate (%)</label>
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="25" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Number of Employees</label>
                  <input type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} placeholder="8" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Additional Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="New product launch, expansion plans, seasonal hires, capital expenditures..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm resize-none mt-1" />
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-50" style={{ backgroundColor: "hsl(15deg, 70%, 55%)" }}>
              {loading ? "Forecasting..." : "Generate Business Forecast"}
            </button>
          </div>
          <div>
            {output ? (
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-200">Business Forecast</h2>
                  <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition">📋 Copy</button>
                </div>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
              </div>
            ) : (
              <div className="bg-gray-800/40 border border-dashed border-gray-700 rounded-2xl p-12 flex items-center justify-center">
                <p className="text-gray-500 text-center">Your business forecast will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
