"use client";
import { useState } from "react";

const ACCENT = "hsl(45, 70%, 55%)";

export default function BusinessForecastPage() {
  const [businessType, setBusinessType] = useState("");
  const [revenue, setRevenue] = useState("");
  const [costOfGoods, setCostOfGoods] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");
  const [monthlyBurn, setMonthlyBurn] = useState("");
  const [cashOnHand, setCashOnHand] = useState("");
  const [historicalGrowth, setHistoricalGrowth] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [fundingStatus, setFundingStatus] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, revenue, costOfGoods, operatingExpenses, monthlyBurn, cashOnHand, historicalGrowth, seasonality, fundingStatus }),
      });
      const data = await res.json();
      setOutput(data.output || "No output generated.");
    } catch {
      setOutput("Error generating forecast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: ACCENT }}>AI Business Financial Forecast</h1>
          <p className="text-gray-400">Generate P&L projections and cash flow runway analysis for your small business</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-200">Business Financials</h2>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Business Type / Industry</label>
              <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="SaaS, retail, consulting, restaurant..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Annual Revenue ($)</label>
                <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="500000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Cost of Goods Sold ($)</label>
                <input type="number" value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)} placeholder="150000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Annual Operating Expenses ($)</label>
              <input type="number" value={operatingExpenses} onChange={(e) => setOperatingExpenses(e.target.value)} placeholder="250000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Monthly Burn Rate ($)</label>
                <input type="number" value={monthlyBurn} onChange={(e) => setMonthlyBurn(e.target.value)} placeholder="15000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Cash on Hand ($)</label>
                <input type="number" value={cashOnHand} onChange={(e) => setCashOnHand(e.target.value)} placeholder="100000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Historical Growth Rate (%)</label>
                <input type="number" value={historicalGrowth} onChange={(e) => setHistoricalGrowth(e.target.value)} placeholder="20" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Seasonality</label>
                <select value={seasonality} onChange={(e) => setSeasonality(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm">
                  {["None", "Mild — Q4 boost", "Strong — Q4 holiday", "Cyclical", "Irregular"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Funding / Financing Status</label>
              <input value={fundingStatus} onChange={(e) => setFundingStatus(e.target.value)} placeholder="Bootstrapped, seed-funded, SBA loan, seeking Series A..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white mt-1 text-sm" />
            </div>

            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
              {loading ? "Forecasting..." : "Generate Financial Forecast"}
            </button>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Your Financial Forecast</h2>
            {output ? (
              <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap overflow-auto max-h-[600px]">
                {output}
              </div>
            ) : (
              <div className="text-gray-500 text-sm space-y-3">
                <p>Your business forecast will include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>12-month P&L projection with revenue and expense breakdowns</li>
                  <li>Cash flow runway analysis (months of survival)</li>
                  <li>Breakeven analysis and timeline to profitability</li>
                  <li>Scenario planning (bear/base/bull cases)</li>
                  <li>Key financial metrics and KPIs to track</li>
                  <li>Recommendations for cost optimization</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
