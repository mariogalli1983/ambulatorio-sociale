// Scheletro Edge Function. Usare service role SOLO come secret server-side.
// Esecuzione giornaliera: seleziona gli appuntamenti tra +7 giorni e invia a ogni specialista
// il riepilogo strettamente necessario (nome, orario, sede; dati clinici solo se legittimi e necessari).
Deno.serve(async () => new Response(JSON.stringify({ok:true,message:'Configure database query + transactional email provider'}),{headers:{'content-type':'application/json'}}));
