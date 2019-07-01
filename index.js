var elasticsearch = require("elasticsearch");
let data = require("./data.json")
let query = require("./query.json")
// console.log("data",data)
var client = new elasticsearch.Client({
  host: "localhost:9200"
  // log: "trace"
});
if (client) {
  getdataElas()
  // insertElas()
} else {
  console.log("can't connect");
}
// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
//   }, function (error) {
//     if (error) {
//       console.trace('elasticsearch cluster is down!');
//     } else {
//       console.log('All is well');
//     }
//   });
async function getdataElas() {
  const response = await client.search(query);
console.log(response.hits.hits[0]._index)
  // for (const tweet of response.hits.hits) {
  //   console.log("tweet:", tweet);
  // }
}

async function insertElas(){
  client.index(data,
    function(err, resp, status) {
      console.log(resp);
    }
  );
}

// client.search({
//   index: 'blog',
//   type: 'posts',
//   q: 'PostName:Node.js'
// }).then(function(resp) {
//   console.log(resp);
// }, function(err) {
//   console.trace(err.message);
// });