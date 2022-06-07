import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {request, loading, error, clearError} = useHttp();

    const _apiKey = '5a8f71d8c8c142aa3b9e3f8ebb09b700';
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _charOffset = '210';

    const getAllCharacters = async (offset = _charOffset) => {
        const res = await request(`
            ${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}
        `);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`
            ${_apiBase}characters/${id}?apikey=${_apiKey}
        `);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: (char.comics.items.length > 10) ? char.comics.items.slice(0, 10) : char.comics.items
        }
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    };

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic};
};

export default useMarvelService;