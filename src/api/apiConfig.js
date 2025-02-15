const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'write your api key here',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
