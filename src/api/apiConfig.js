const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '0c3ad52703aef22b1667a4080d9303cb',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;