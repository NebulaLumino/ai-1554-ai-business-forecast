import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({ baseURL: "https://api.deepseek.com/v1", apiKey: process.env.OPENAI_API_KEY });
    const { revenue, expenses, growthRate, seasonality, taxRate, costOfGoods, employees, notes } = await req.json();

    const rev = Number(revenue) || 0;
    const exp = Number(expenses) || 0;
    const cogs = Number(costOfGoods) || 0;
    const growth = Number(growthRate) || 15;
    const tax = Number(taxRate) || 25;
    const grossProfit = rev - cogs;
    const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
    const netIncome = grossProfit - exp;
    const netMargin = rev > 0 ? (netIncome / rev) * 100 : 0;
    const year2 = rev * (1 + growth / 100);
    const year3 = year2 * (1 + growth / 100);
    const year4 = year3 * (1 + growth / 100);
    const year5 = year4 * (1 + growth / 100);

    const prompt = `You are an expert business analyst and financial forecaster. Generate a comprehensive business forecast report.

**Business Financials:**
${revenue ? `Annual Revenue: $${Number(revenue).toLocaleString()}` : "Revenue: Not specified"}
${expenses ? `Annual Expenses: $${Number(expenses).toLocaleString()}` : "Expenses: Not specified"}
${costOfGoods ? `Cost of Goods Sold: $${Number(costOfGoods).toLocaleString()}` : "COGS: Not specified"}
Projected Growth Rate: ${growthRate || "15"}%
Seasonality: ${seasonality || "Minimal seasonality"}
Tax Rate: ${taxRate || "25"}%
${employees ? `Employees: ${employees}` : "Employees: Not specified"}
${notes ? `Notes: ${notes}` : ""}

**Key Metrics:**
Gross Profit: $${grossProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}
Gross Margin: ${grossMargin.toFixed(1)}%
Net Operating Income: $${netIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}
Net Margin: ${netMargin.toFixed(1)}%

**5-Year Revenue Projection:**
Year 1: $${rev.toLocaleString(undefined, {maximumFractionDigits: 0})}
Year 2: $${year2.toLocaleString(undefined, {maximumFractionDigits: 0})}
Year 3: $${year3.toLocaleString(undefined, {maximumFractionDigits: 0})}
Year 4: $${year4.toLocaleString(undefined, {maximumFractionDigits: 0})}
Year 5: $${year5.toLocaleString(undefined, {maximumFractionDigits: 0})}

Generate a comprehensive business forecast in markdown:

## Business Forecast Report

### 1. Current Financial Health
- Revenue breakdown analysis
- Gross margin assessment
- Operating expense ratio
- Net profit margin
- Break-even analysis

### 2. 5-Year Financial Projection
- Conservative / base / optimistic scenarios
- Revenue trajectory by year
- Profit margin evolution
- EBITDA projection
- Cumulative earnings forecast

### 3. Seasonality Adjustments
- ${seasonality} analysis
- Quarterly cash flow implications
- Working capital requirements
- Staffing adjustments for peak seasons

### 4. Growth Strategy
- Revenue drivers for ${growth}% growth target
- New customer acquisition cost
- Customer retention impact
- Upsell / cross-sell opportunities
- Pricing strategy considerations

### 5. Cash Flow Analysis
- Monthly cash flow projection
- Working capital cycle
- Cash conversion period
- Emergency cash reserve recommendation
- Accounts receivable management

### 6. Expense Optimization
- Fixed vs. variable expense split
- Cost reduction opportunities
- Economies of scale projections
- Technology / automation investments

### 7. Tax Planning
- Estimated tax liability by year
- Deduction optimization strategies
- Qualified Business Income (QBI) deduction
- Estimated quarterly payments schedule

### 8. Key Performance Indicators
- Revenue per employee
- Customer acquisition cost (CAC)
- Customer lifetime value (CLV)
- Break-even point in revenue
- Target gross margin by product line

### 9. Scenario Analysis
- Best case (growth + pricing power)
- Base case (current trajectory)
- Worst case (market downturn)
- Sensitivity analysis on key assumptions

### 10. Action Items
- 90-day priority actions
- Metrics to track monthly
- Financing needs assessment
- Exit / scale planning considerations

Format as clean markdown with tables for projections. Include specific dollar amounts.`;

    const completion = await openai.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 3000 });
    return NextResponse.json({ output: completion.choices[0].message.content });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
