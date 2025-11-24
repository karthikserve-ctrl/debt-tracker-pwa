
// features/risk_engine.js
// Computes a simple risk score based on EMI ratio, waste ratio, and savings ratio.
(function(){
  if(window.__riskEngineAdded) return;
  window.__riskEngineAdded = true;

  function sumHistoryByMerchant(history, merchantList){
    return history.reduce((s,h)=> s + ((h.merchant||'').toLowerCase().split(' ').some(w=> merchantList.includes(w)) ? Number(h.amount||0) : 0), 0);
  }

  window.computeRiskScore = function(appState){
    const income = Number(appState.incomeMonthly||0);
    const totalOutgo = (appState.history||[]).reduce((s,h)=>s+Number(h.amount||0),0);
    const emiTotal = (appState.loans||[]).reduce((s,l)=>s+Number(l.emi||0),0);
    const emiRatio = income>0 ? emiTotal / income : 0;
    const saveRatio = income>0 ? Math.max(0, income - totalOutgo) / income : 0;
    const wasteMerchants = appState.settings && appState.settings.wasteMerchants ? appState.settings.wasteMerchants : ["swiggy","zomato","amazon","flipkart","myntra","ajio","blinkit","bajaj","meesho","nykaa"];
    // compute waste by checking merchant contains any keyword
    const wasteTotal = (appState.history||[]).reduce((s,h)=> s + (wasteMerchants.some(w=> (h.merchant||'').toLowerCase().includes(w)) ? Number(h.amount||0) : 0), 0);
    const wasteRatio = income>0 ? wasteTotal / income : 0;

    let score = 80;
    if(emiRatio > 0.4) score -= 25; else if(emiRatio > 0.25) score -= 10;
    if(wasteRatio > 0.15) score -= 20; else if(wasteRatio > 0.08) score -= 8;
    if(saveRatio < 0.12) score -= 20; else if(saveRatio < 0.18) score -= 8;
    score = Math.max(0, Math.min(100, Math.round(score)));
    // category signals
    const status = score < 40 ? 'At Risk' : (score < 70 ? 'Balanced' : 'Safe');
    return {score, status, emiRatio, wasteRatio, saveRatio, totalOutgo, wasteTotal};
  };

  console.log('risk_engine loaded');
})();
