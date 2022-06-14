const fetch = require("node-fetch");

exports.handler = async function(event) {
  const { id } = JSON.parse(event.body)

  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const { results } = await request.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      results,
    })
  }
};