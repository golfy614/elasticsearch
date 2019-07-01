var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});
if (client) {
  getdataElas()
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
  const response = await client.search({
    index: "blog",
    type: "posts",
    q: 'PostName:Elasticsearch'
  });
console.log(response.hits.hits[0]._index)
  // for (const tweet of response.hits.hits) {
  //   console.log("tweet:", tweet);
  // }
}

async function insertElas(){
  client.index(
    {
      index: "blog",
      id: "1",
      type: "posts",
      body: {
        PostName: "Integrating Elasticsearch Into Your Node.js Application",
        PostType: "Tutorial",
        PostBody:
          "This is the text of our tutorial about using Elasticsearch in your Node.js application."
      }
    },
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