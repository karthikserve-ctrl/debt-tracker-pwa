
// features/upload_manual.js - improved for MNC UI integration
(function(){
  if(window.__uploadManualAdded) return;
  window.__uploadManualAdded = true;
  window.createCsvTemplate = function(){
    const csv = 'Date,Merchant,Amount,Category\n2025-03-01,Swiggy,340,Food\n2025-03-02,Petrol,700,Travel\n';
    return new Blob([csv], {type:'text/csv'});
  };
  window.parseCSVText = function(text){
    const lines = text.split(/\r?\n/).filter(l=>l.trim().length>0);
    const rows = [];
    for(let i=1;i<lines.length;i++){
      const cols = lines[i].split(',');
      rows.push({row:i+1, date: (cols[0]||'').trim(), merchant:(cols[1]||'').trim(), amount:(cols[2]||'').trim(), category:(cols[3]||'').trim()});
    }
    return rows;
  };
  window.validateRow = function(r){
    const res = {date:false,merchant:false,amount:false,category:true,message:''};
    if(!r.date || r.date.trim()==='') res.date=false; else res.date=true;
    if(!r.merchant || r.merchant.trim()==='') res.merchant=false; else res.merchant=true;
    const a = Number((r.amount||'').toString().replace(/[^0-9.-]/g,''));
    if(isNaN(a) || a<=0){ res.amount=false; res.message = res.message?res.message+', Invalid amount':'Invalid amount'; } else res.amount=true;
    if(!r.category || r.category.trim()==='') res.category=false;
    if(res.date && res.merchant && res.amount) res.message='OK';
    return res;
  };
  console.log('upload_manual feature loaded (MNC)');
})();
