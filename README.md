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
