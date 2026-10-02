# Ambulatorio Sociale — V0.1

Prototipo GitHub Pages + architettura Supabase per prenotazioni multi-sede e multi-specialista.

## Cosa c'è già
- Home responsive
- Form prenotazione
- Sedi, prestazioni e slot pensati come dati modificabili dal backend
- Mockup area amministratore
- Privacy, cookie, termini e disclaimer
- Schema SQL con Row Level Security di base
- Scheletro riepilogo settimanale allo specialista

## Prima del go-live
1. Definire titolare, ruoli privacy, specialisti e prima sede.
2. Validare informativa, basi giuridiche, conservazione, responsabili e necessità DPIA.
3. Creare progetto Supabase in regione UE/SEE adeguata alle esigenze e sottoscrivere gli accordi necessari.
4. Implementare Edge Function `create-booking` per evitare scritture dirette dal browser.
5. Collegare un provider email transazionale e configurare conferma/annullamento.
6. Implementare login admin con MFA, ruoli e audit log.
7. Test sicurezza, backup, incident response e verifica accessi.

## Pubblicazione GitHub Pages
Caricare l'intera cartella nel repository, poi Settings → Pages → Deploy from branch → `main` / root.

**Importante:** GitHub contiene solo il frontend. Non salvare mai dati dei pazienti, export, password, service-role key o altri segreti nel repository.
