/* --- Import dei moduli --- */
const express = require("express");
const app = express();
const fs = require("fs");
const parse = require("csv-parse").parse;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


/* --- Inizio Endpoints --- */

/* Homepage */
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html');
});


/* Mappa */
app.get('/overview', (req, res) => {
  res.render(__dirname + '/views/overview.html');
});


/* Ricerca */
app.get('/ricerca', (req, res) => {
  res.render(__dirname + '/views/ricerca.html');
});


/* Inserimento */
app.get('/inserisci', (req, res) => {
  res.render(__dirname + '/views/inserisci.html');
});


/* Rimozione */
app.get('/rimuovi', (req, res) => {
  res.render(__dirname + '/views/rimuovi.html');
});


/* Endpoint GET per restituire il valore ricercato tramite tipo, nome, codice o indice nella pagina ricerca.html */
app.get('/dati/:par', (req, res) => {
  let fileConv = CSVToArray(fs.readFileSync("./views/impiantisportivi.csv"));
  let data = [];
  
  
  //Cerco per tipo
  if(isNaN(req.params.par) && req.params.par == req.params.par.toLowerCase()){
    //Confronto il parametro passato e salvo ogni punto di interesse con tipo uguale al parametro
    switch(req.params.par){
      case "calcio":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da calcio")
            data.push(elemento);
        });
        break;
      case "calcetto":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da calcetto")
            data.push(elemento);
        });
        break;
      case "basket":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da basket")
            data.push(elemento);
        });
        break;
      case "tennis":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da tennis")
            data.push(elemento);
        });
        break;
      case "rugby":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da rugby")
            data.push(elemento);
        });
        break;
      case "golf":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo da golf")
            data.push(elemento);
        });
        break;
      case "atletica":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Pista di atletica")
            data.push(elemento);
        });
        break;
      case "patt":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Pista di pattinaggio")
            data.push(elemento);
        });
        break;
      case "arco":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Tiro con l'arco")
            data.push(elemento);
        });
        break;
      case "segno":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Tiro a segno")
            data.push(elemento);
        });
        break;
      case "peso":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Getto del peso")
            data.push(elemento);
        });
        break;
      case "ippica":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Centro ippico")
            data.push(elemento);
        });
        break;
      case "microracing":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Pista micro racing")
            data.push(elemento);
        });
        break;
      case "poli":
        fileConv.forEach(elemento => { 
          let substring = elemento.toString().split(",");
          if (substring[2] == "Campo polivalente")
            data.push(elemento);
        });
        break;
      default:
        res.status(400).send("<p style='font-size: 17px; font-family: Verdana; text-align: center;'>La ricerca non ha prodotto risultati</p>");
        break;
    }
    
    
    
    if(data.length > 0){
      res.status(200).send(JSON.stringify(data));
    }else{
      res.status(404).send("<p style='font-size: 17px; font-family: Verdana; text-align: center;'>La ricerca non ha prodotto risultati</p>");
    }
  }
  
  
  //Cerco per indice
  if(!isNaN(req.params.par)){
    //Controllo se l'indice e' valido
    if(req.params.par > 0 && req.params.par < fileConv.length){
      res.status(200).send(JSON.stringify(fileConv[req.params.par]));
    }else{
      res.status(400).type("text/html").send("<p style='font-size: 17px; font-family: Verdana; text-align: center;'>Indice non ammesso</p>");
    }
  }
  
  
  //Cerco per codice univoco (la cui lunghezza nel file CSV e' sempre di 3 caratteri, il primo carattere e' sempre una lettera ed i restanti sono sempre numeri)
  if(req.params.par.length == 3 && isNaN(req.params.par.charAt(0)) && !isNaN(req.params.par.charAt(1)) && !isNaN(req.params.par.charAt(2))){
    fileConv.forEach(elemento => { 
      let substring = elemento.toString().split(",");
      if (substring[4] == req.params.par) 
        data.push(elemento);
    });
    
    if(data.length > 0){
      res.status(200).send(JSON.stringify(data));
    }else{
      res.status(404).type("text/html").send("<p style='font-size: 17px; font-family: Verdana; text-align: center;'>La ricerca non ha prodotto risultati</p>");
    }
  }
  
  
  //Cerco per nome
  if(req.params.par.length > 0 && isNaN(req.params.par)){
    fileConv.forEach(elemento => {
      let substring = elemento.toString().split(",");
      if (substring[3] == req.params.par)
        data.push(elemento);
    });
    
    if(data.length > 0){
      res.status(200).send(JSON.stringify(data));
    }else{
      res.status(404).type("text/html").send("<p style='font-size: 17px; font-family: Verdana; text-align: center;'>La ricerca non ha prodotto risultati</p>");
    }
  }
});



/* Endpoint GET per recuperare il nuovo punto di interesse inserito tramite form */
app.get('/inserimento', (req, res) => {
  /* E' necessario modificare il valore del tipo scelto tramite form, in modo tale da poter lavorare con il nome 
     e non con il value */
  switch(req.query.tipo){
    case 'calcio':
      req.query.tipo = "Campo da calcio";
      break;
    case 'calcetto':
      req.query.tipo = "Campo da calcetto";
      break;
    case 'basket':
      req.query.tipo = "Campo da basket";
      break;
    case 'tennis':
      req.query.tipo = "Campo da tennis";
      break;
    case 'rugby':
      req.query.tipo = "Campo da rugby";
      break;
    case 'golf':
      req.query.tipo = "Campo da golf";
      break;
    case 'atletica':
      req.query.tipo = "Pista di atletica";
      break;
    case 'patt':
      req.query.tipo = "Pista di pattinaggio";
      break;
    case 'arco':
      req.query.tipo = "Tiro con l'arco";
      break;
    case 'segno':
      req.query.tipo = "Tiro a segno";
      break;
    case 'peso':
      req.query.tipo = "Getto del peso";
      break;
    case 'ippica':
      req.query.tipo = "Centro ippico";
      break;
    case 'microracing':
      req.query.tipo = "Pista micro racing";
      break;
    case 'poli':
      req.query.tipo = "Campo polivalente";
      break;
    default:
      res.status(400).send("Inserire un tipo accettabile");
      break;
  }
  
  //Costruisco il nuovo punto
  /* N.B.: Per il corretto inserimento della stringa nel CSV occorre aggiungere uno "\n" all'inizio */
  let nuovoPunto =   "\n" + req.query.long       + "," +
                            req.query.lat        + "," +
                            req.query.tipo       + "," +
                            req.query.nome       + "," +
                            req.query.codice     + "," +
                            req.query.indirizzo  + "," +
                            req.query.long       + "," +
                            req.query.lat;
  
  //Aggiungo il nuovo punto al file CSV  
  fs.appendFileSync("./views/impiantisportivi.csv", nuovoPunto);
  res.render(__dirname + '/views/success.html');
});


/* Endpoint POST per l'inserimento di punti di interesse tramite client esterni */
app.post('/inserimento', (req, res) => {
  let nuovoPunto =   "\n" + req.body.long       + "," +
                            req.body.lat        + "," +
                            req.body.tipo       + "," +
                            req.body.nome       + "," +
                            req.body.codice     + "," +
                            req.body.indirizzo  + "," +
                            req.body.long       + "," +
                            req.body.lat;
  
  //Controllo dei parametri
  if(req.body.tipo != "" &&
     /*req.body.nome !== "" &&*/ //N.B.: Alcuni punti di interesse non hanno un nome, quindi non e' obbligatorio
     req.body.codice != "" &&
     req.body.indirizzo != "" &&
     !isNaN(req.body.long) &&
     !isNaN(req.body.lat)){
     
     fs.appendFileSync("./views/impiantisportivi.csv", nuovoPunto);
     res.status(200).send(nuovoPunto);
    
  }else{
    res.status(400).send("Inserire i parametri mancanti");
  }
});



/* Endpoint DELETE per rimuovere un punto di interesse per indice */
app.delete("/rimuovi/:par", (req, res) => {
  let fileConv = CSVToArray(fs.readFileSync("./views/impiantisportivi.csv"));
  let fileNuovo = "";  //variabile d'appoggio per memorizzare tutto il file modificato, che manchera' della riga rimossa
  
  /* Effettuo controllo sull'indice */
  if(req.params.par > 0 && req.params.par <= fileConv.length){
    fileConv.splice(req.params.par, 1);  //alla posizione req.params.par, rimuovo 1 elemento

    /* Dato che la funzione writeFileSync prende una stringa come secondo parametro, ho bisogno
       di una variabile stringa d'appoggio che memorizzi tutto il contenuto del file da ristampare */
    for (let i = 0; i < fileConv.length - 1; i++) {
      fileNuovo += String(fileConv[i]) + "\n";
    }

    fileNuovo += String(fileConv[fileConv.length - 1]);

    fs.writeFileSync(__dirname + "/views/impiantisportivi.csv", fileNuovo);
    res.status(200).send("Elemento eliminato correttamente");
  }else{
    res.status(400).send("Indice non ammesso");
  }
});
  
  

/* Endpoint GET che restituisce i dati CSV */
app.get('/impianticsv', (req, res) => {
  res.type('text/csv').sendFile(__dirname + '/views/impiantisportivi.csv');
});


app.listen(process.env.PORT || 4000, () => 
           console.log("Server listen on " + process.env.PORT)
); //mettiti in ascolto sulla porta che ritieni opportuna



/*---INIZIO FUNZIONI---*/

/* Funzione CSVToArray che prende in ingresso il file CSV per convertirlo in array */
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not, then default to comma.
  strDelimiter = strDelimiter || ",";
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );
  // Create an array to hold our data. Give the array a default empty first row.
  var arrData = [[]];
  // Create an array to hold our individual pattern matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];
    // Check to see if the given delimiter has a length (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }
    var strMatchedValue;
    // Now that we have our delimiter out of the way, let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }
    // Now that we have our value string, let's add it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  // Return the parsed data.
  return arrData;
}