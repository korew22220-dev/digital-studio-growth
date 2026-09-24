export function calculateMetrics({ leadsPerMonth, averageCheck, conversion, packagePrice, months }) {
  const values = [leadsPerMonth, averageCheck, conversion, packagePrice, months];
  if (values.some((v) => !Number.isFinite(v) || v < 0)) return null;
  const totalLeads = leadsPerMonth * months;
  const sales = totalLeads * conversion / 100;
  const revenue = sales * averageCheck;
  return {
    totalLeads,
    sales,
    revenue,
    costPerLead: totalLeads ? packagePrice / totalLeads : null,
    spendShare: revenue ? packagePrice / revenue * 100 : null,
  };
}
