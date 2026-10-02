// Configurazione pubblica Supabase. Inserire valori reali solo al go-live.
const CONFIG = { supabaseUrl: '', supabaseAnonKey: '' };
const $=s=>document.querySelector(s);
async function loadOptions(){
  if(!CONFIG.supabaseUrl){ $('#demo-note')?.classList.add('ok'); return; }
  const headers={apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`};
  const locations=await fetch(`${CONFIG.supabaseUrl}/rest/v1/locations?active=eq.true&select=id,name,address&order=name`,{headers}).then(r=>r.json());
  const services=await fetch(`${CONFIG.supabaseUrl}/rest/v1/services?active=eq.true&select=id,name&order=name`,{headers}).then(r=>r.json());
  $('#location').innerHTML='<option value="">Scegli la sede</option>'+locations.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
  $('#service').innerHTML='<option value="">Scegli la prestazione</option>'+services.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
}
async function loadSlots(){
  if(!CONFIG.supabaseUrl)return;
  const loc=$('#location').value, svc=$('#service').value;if(!loc||!svc)return;
  const h={apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`};
  const q=`location_id=eq.${loc}&service_id=eq.${svc}&booked=eq.false&starts_at=gte.${encodeURIComponent(new Date().toISOString())}&select=id,starts_at&order=starts_at`;
  const slots=await fetch(`${CONFIG.supabaseUrl}/rest/v1/slots?${q}`,{headers:h}).then(r=>r.json());
  $('#slot').innerHTML='<option value="">Scegli data e ora</option>'+slots.map(x=>`<option value="${x.id}">${new Date(x.starts_at).toLocaleString('it-IT')}</option>`).join('');
}
async function submitBooking(e){
 e.preventDefault(); const st=$('#status');st.className='status';
 if(!CONFIG.supabaseUrl){st.textContent='Modalità demo: il modulo è pronto ma il database non è ancora collegato.';st.classList.add('ok');return;}
 const payload=Object.fromEntries(new FormData(e.target).entries());
 try{const r=await fetch(`${CONFIG.supabaseUrl}/functions/v1/create-booking`,{method:'POST',headers:{'Content-Type':'application/json',apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`},body:JSON.stringify(payload)});if(!r.ok)throw new Error(await r.text());st.textContent='Prenotazione registrata. Controlla la tua email per il riepilogo.';st.classList.add('ok');e.target.reset()}catch(err){st.textContent='Non è stato possibile completare la prenotazione. Riprova o contatta la segreteria.';st.classList.add('err')}
}
document.addEventListener('DOMContentLoaded',()=>{loadOptions();$('#location')?.addEventListener('change',loadSlots);$('#service')?.addEventListener('change',loadSlots);$('#booking')?.addEventListener('submit',submitBooking)});
