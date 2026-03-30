import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { businessType, revenue, costOfGoods, operatingExpenses, monthlyBurn, cashOnHand, historicalGrowth, seasonality, fundingStatus } = await req.json();

    const prompt = `You are an expert small business CFO and financial analyst. Generate a comprehensive P&L projection and cash flow runway analysis in markdown based on the following business financials:

- Business Type: ${businessType || "N/A"}
- Annual Revenue: ${revenue ? "$" + Number(revenue).toLocaleString() : "N/A"}
- Cost of Goods Sold: ${costOfGoods ? "$" + Number(costOfGoods).toLocaleString() : "N/A"}
- Annual Operating Expenses: ${operatingExpenses ? "$" + Number(operatingExpenses).toLocaleString() : "N/A"}
- Monthly Burn Rate: ${monthlyBurn ? "$" + Number(monthlyBurn).toLocaleString() : "N/A"}
- Cash on Hand: ${cashOnHand ? "$" + Number(cashOnHand).toLocaleString() : "N/A"}
- Historical Growth Rate: ${historicalGrowth ? historicalGrowth + "%" : "N/A"}
- Seasonality: ${seasonality || "None"}
- Funding Status: ${fundingStatus || "N/A"}

Generate a comprehensive financial forecast including:
1. **Profit & Loss Projection Table** — 12-month P&L with revenue, COGS, gross profit, operating expenses, operating income, and net income (monthly columns + annual total)
2. **Gross Margin Analysis** — Gross profit margin percentage and what drives it
3. **Cash Flow Runway Analysis** — How many months the business can survive at current burn rate with current cash
4. **Breakeven Analysis** — Revenue level needed to cover all fixed costs and reach breakeven
5. **Scenario Planning** — Three scenarios (bear/base/bull) with key assumptions and outcomes:
   - Bear: -20% revenue
   - Base: expected revenue per growth rate
   - Bull: +25% revenue
6. **Key Financial KPIs** — Recommend 5-8 KPIs specific to their business type to track monthly
7. **Cost Optimization Recommendations** — Top 3 areas where expenses could be reduced without hurting growth
8. **Financing Recommendations** — Based on funding status, suggest appropriate financing options (SBA loan, revenue-based financing, angel investment, etc.)

Format as clean markdown with tables, bold headers, and specific dollar amounts. Use realistic assumptions when data is missing and note them.`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const output = completion.choices[0].message.content;
    return NextResponse.json({ output });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
