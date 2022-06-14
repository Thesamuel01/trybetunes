const getMusics = async (id) => {
  const request = await fetch(`../.netlify/functions/music`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    })
  });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
