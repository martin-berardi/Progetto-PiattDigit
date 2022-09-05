**Studente**: Berardi Martin \
**Matricola**: 307283


# Servizio Localizzazione Impianti Sportivi
## Descrizione del servizio implementato e del suo scopo

Oggigiorno la tecnologia ha raggiunto passi da gigante, ed è in continuo sviluppo. La sua grande evoluzione ha portato con sé purtroppo, oltre agli innumerevoli pregi, parecchi problemi di diverso tipo. Uno di questi è la sedentarietà, rinunciare al sano movimento e allo sport per giocare con i videogiochi.\
Questa piattaforma è stata pensata per poter reperire la posizione di alcuni impianti sportivi di diverso genere (campi da calcio, da basket, da golf, etc.) tramite i dati forniti dal sito (https://dati.gov.it/).

La piattaforma dispone di molteplici funzionalità:
1. È possibile avere una visuale generale di tutti i punti di interesse tramite una mappa, con il rispettivo elenco.
2. È possibile ricercare un punto di interesse per tipo, nome, codice univoco o indice.
3. È possibile aggiungere o rimuovere un punto di interesse.


## Descrizione di architettura e scelte implementative 
La piattaforma è poggiata su NodeJS. I dati utilizzati sono forniti tramite un file CSV. \
I dati presenti nel file CSV non sono stati in alcun modo ritoccati o modificati.
Notare che alcuni punti di interesse mancano di alcuni attributi, e.g. il nome.

Il front-end è stato sviluppato grazie all'uso di HTML5, CSS3 e JS. Inoltre, per la creazione della mappa, sono stati utilizzati Leaflet (una libreria JavaScript open source per mappe interattive ottimizzate per dispositivi mobili, https://leafletjs.com/), e OpenStreetMap. \
Il back-end è composto da JS e alcuni moduli:
- `express`: per usare NodeJS
- `fs`: per manipolare i file
- `ejs`: per effettuare il render di pagine HTML con JS.

È stato utilizzato JS per la manipolazione e la validazione dei dati inseriti da tastiera tramite form. \
È presente una piccola funzione di refresh dei campi del form, scritta in JQuery. \
Gli endpoint possono essere contattati sia tramite form che tramite URL.

In un'epoca dove il mobile sta prendendo sempre più piede, è stato scelto di ottimizzare la piattaforma per renderla esteticamente più piacevole anche su schermi di dimensione inferiore rispetto a quello di un PC.


## Riferimento a eventuali dati o servizi esterni sfruttati
Gli opendata utilizzati provengono dal seguente link: (https://dati.gov.it/view-dataset/dataset?id=19c251f3-bd52-4a13-9ba1-6d4d4b75645f).
I servizi esterni sfruttati sono Leaflet e OpenStreetMap.


## Documentazione dell’API implementata
 - **progetto-impianti-sportivi.glitch.me/** \
Endpoint GET che restituisce la pagina principale (index.html)

**INPUT**: niente
**OUTPUT**: views/index.html

 - **progetto-impianti-sportivi.glitch.me/impianticsv** \
Endpoint GET che restituisce il file CSV contenente tutti i dati

**INPUT**: niente \
**OUTPUT**: views/impiantisportivi.csv

- **progetto-impianti-sportivi.glitch.me/overview** \
Endpoint GET che restituisce la pagina web che mostra la mappa di tutti i punti di interesse con il rispettivo elenco

**INPUT**: niente \
**OUTPUT**: views/overview.html

- **progetto-impianti-sportivi.glitch.me/ricerca** \
Endpoint GET che restituisce la pagina web per la ricerca di uno specifico punto di interesse
**INPUT**: niente \
**OUTPUT**: views/ricerca.html

- **progetto-impianti-sportivi.glitch.me/inserisci** \
Endpoint GET che restituisce la pagina web per l'inserimento di un nuovo punto di interesse
**INPUT**: niente \
**OUTPUT**: views/inserisci.html

- **progetto-impianti-sportivi.glitch.me/rimuovi** \
Endpoint GET che restituisce la pagina web per la rimozione di un punto di interesse
**INPUT**: niente \
**OUTPUT**: views/rimuovi.html

- **progetto-impianti-sportivi.glitch.me/dati/:par** \
Endpoint GET che restituisce le informazioni appartenenti ad un punto di interesse, ricercato tramite tipo, nome, codice o indice (posizione nell'elenco) nella pagina ricerca.html
**INPUT**: il parametro :par può assumere diversi tipi e configurazioni, in base a quale criterio si vuole ricercare il punto di interesse
**OUTPUT**: 


