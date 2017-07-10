const path = require('path')
const fs = require('fs')
const rdfstore = require('rdfstore')

let query1 = " PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\
SELECT *\
WHERE { ?subject rdfs:label ?object .\
    } \
"
let query2 = " PREFIX obo:<http://purl.obolibrary.org/obo/>\
SELECT *\
WHERE { ?subject obo:IAO_0000115 ?object .\
    } \
"
let query3 = " PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\
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
    console.log("inside store load", results)
    /*store.execute(query1,function(success,results1) {
      console.log("after query1~~~~~>: ",results1)
    })

    store.execute(query2,function(success,results2) {
      console.log("------Starting Query 2 ----------")
      console.log("after query 2---->: ",results2)
    })*/
    store.execute(query3,function(success,results3) {
      console.log("------Starting Query 3 ----------")
      console.log("after query 3---->: ",results3)
    })
  })

})
