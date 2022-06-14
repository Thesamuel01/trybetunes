const fetch = require("node-fetch");

exports.handler = async function(event) {
  const { artist } = JSON.parse(event.body)

  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;
  
  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      results,
    })
  }
};