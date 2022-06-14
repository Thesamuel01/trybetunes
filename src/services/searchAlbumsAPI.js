const searchAlbumsAPI = async (artist) => {
  const APIResponse = await fetch('../.netlify/functions/albums', {
    method: 'POST',
    body: JSON.stringify({
      artist,
    })
  });

  const { results } = await APIResponse.json();

  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
