export type CalculatorInput = { leadsPerMonth:number; averageCheck:number; conversion:number; packagePrice:number; months:number };
export type CalculatorMetrics = { totalLeads:number; sales:number; revenue:number; costPerLead:number|null; spendShare:number|null };
export function calculateMetrics(input:CalculatorInput):CalculatorMetrics|null;
