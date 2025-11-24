
// features/debt_engine.js
// Simulate debt payoff month-by-month with optional extra payment allocation using Avalanche or Snowball.
(function(){
  if(window.__debtEngineAdded) return;
  window.__debtEngineAdded = true;

  function amortize(principal, annualRate, months){
    const r = annualRate/100/12;
    if(r===0) return {monthly: principal/months, totalPayment: principal};
    const emi = (principal * r * Math.pow(1+r, months)) / (Math.pow(1+r, months) - 1);
    return {monthly: emi, totalPayment: emi*months};
  }

  window.simulateDebtPayoff = function(loans, extraPerMonth, strategy){
    // loans: [{id,principalOutstanding,rate,remainingMonths}]
    // strategy: 'avalanche' or 'snowball'
    const copy = loans.map(l=>Object.assign({}, l));
    const history = [];
    let month = 0;
    const maxMonths = 600;
    while(copy.some(l=>l.principalOutstanding>0) && month < maxMonths){
      month++;
      // determine target loan based on strategy
      let targets = copy.filter(l=>l.principalOutstanding>0);
      if(strategy==='avalanche') targets.sort((a,b)=>b.rate - a.rate);
      else targets.sort((a,b)=>a.principalOutstanding - b.principalOutstanding);
      // apply regular EMIs and extras to first target
      let monthlyExtra = extraPerMonth || 0;
      targets.forEach((ln, idx)=>{
        const monthlyDue = Number(ln.emi || 0);
        // interest for month
        const monthlyRate = (Number(ln.rate||0)/100)/12;
        const interest = ln.principalOutstanding * monthlyRate;
        let principalPart = Math.max(0, monthlyDue - interest);
        // if this is primary target, add extra to principal
        if(idx===0 && monthlyExtra>0){
          principalPart += monthlyExtra;
        }
        ln.principalOutstanding = Math.max(0, ln.principalOutstanding - principalPart);
        // decrement months conservatively
        ln.remainingMonths = Math.max(0, ln.remainingMonths - 1);
      });
      history.push({month, snapshot: JSON.parse(JSON.stringify(copy))});
      if(month > 240) break;
    }
    // compute payoff month estimation
    const payoffMonth = month;
    return {history, payoffMonth};
  };

  console.log('debt engine loaded');
})();
