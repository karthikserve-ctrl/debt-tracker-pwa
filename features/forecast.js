
// features/forecast.js
// Simple next-month forecast engine: calculates safe daily/weekly/month limits and suggested cuts.
(function(){
  if(window.__forecastAdded) return;
  window.__forecastAdded = true;

  window.generateForecast = function(appState){
    const income = Number(appState.incomeMonthly||0);
    const totalOutgo = (appState.history||[]).reduce((s,h)=>s+Number(h.amount||0),0);
    const plannedNeeds = appState.plannedNeeds || 0;
    const days = 30;
    const wants = Math.max(0, income*0.3 - (plannedNeeds || 0));
    // naive safe monthly: income - fixed needs - EMI
    const emiTotal = (appState.loans||[]).reduce((s,l)=>s+Number(l.emi||0),0);
    const fixedNeeds = appState.fixedNeedsTotal || plannedNeeds || 0;
    const safeMonthly = Math.max(0, income - fixedNeeds - emiTotal - (income*0.2)); // keep 20% savings target
    const dailySafe = Math.round(safeMonthly / days);
    const weeklySafe = Math.round(safeMonthly / 4);
    // suggested cuts: top overspent categories
    const catTotals = {};
    (appState.history||[]).forEach(h=>{ const c = (h.category||'Misc'); catTotals[c] = (catTotals[c]||0) + Number(h.amount||0); });
    const suggestions = [];
    Object.keys(appState.planned||{}).forEach(k=>{
      const planned = Number(appState.planned[k]||0);
      const actual = Number(catTotals[k]||0);
      if(actual > planned){
        suggestions.push({category:k, planned, actual, reduceBy: actual - planned});
      }
    });
    return {income, totalOutgo, safeMonthly, dailySafe, weeklySafe, suggestions};
  };

  console.log('forecast engine loaded');
})();
