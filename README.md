# Ferie

App per il telefono con il calendario ferie del locale.

- **Dipendenti**: entrano con Google, vedono chi è in ferie, propongono un periodo con una nota facoltativa che leggono solo i titolari, possono ritirare la proposta finché è in attesa.
- **Titolari**: scheda "Da decidere" per la riunione del mercoledì, con le sovrapposizioni in evidenza. Con **Conferma** le ferie finiscono anche nel Google Calendar "Calendario Ferie / Eventi". Con **Non confermare** si può scrivere un motivo, che la persona vede.

Dati in Firestore (stesso progetto Firebase del Catalogo): `ferie_richieste`, `ferie_note`. Le regole con le email sono in `../catalogo-app/firestore.rules` (blocco "Ferie") e non vanno su GitHub.
Per aggiungere o togliere un dipendente: modifica la lista in `staffFerie()` nelle regole e ripubblicale nella console Firebase.

Provarla sul PC: `node server.js` e apri
- http://localhost:5176/?prova  → modalità prova con dati finti; dal menu account si passa da dipendente a titolare
- http://localhost:5176         → app vera (login Google)

## Attivazione (una volta sola)
1. Console Firebase → Firestore → Regole: incolla tutto `catalogo-app/firestore.rules` e pubblica.
2. Abilita la Google Calendar API nel progetto `le-mie-note-d18dd`:
   https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=le-mie-note-d18dd
3. In Google Calendar, "Calendario Ferie / Eventi" → Condivisione: ogni titolare che conferma deve avere "Apportare modifiche agli eventi".
4. La prima volta che un titolare conferma, Google chiede il permesso per il calendario e può mostrare "App non verificata": Avanzate → Vai all'app.
