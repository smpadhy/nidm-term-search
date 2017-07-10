const path = require('path')
const fs = require('fs')
const rdfstore = require('rdfstore')

let query = " PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\
PREFIX obo:<http://purl.obolibrary.org/obo/>\
SELECT *\
WHERE { ?subject rdfs:label ?label ;\
  obo:IAO_0000115 ?desc .\
    } \
"
let data = fs.createReadStream(path.join(__dirname,'/nidm-experiment.owl'))
new rdfstore.Store(function(err, store) {
  store.load("text/turtle",data,function(err, results){
    if(err){
      console.log(err)
    }
    //console.log("inside store load", results)
    store.execute(query,function(success,results) {
      console.log("----- Query Results  ----------")
      console.log(results)
    })
  })
})
