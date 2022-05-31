import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {request, loading, error, clearError} = useHttp();

    const _apiKey = '5a8f71d8c8c142aa3b9e3f8ebb09b700';
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _charOffset = '210';

    // getResource = async (url) => {
    //     let res = await fetch(url);
    
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _charOffset) => {
        const res = await request(`
            ${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}
        `);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`
            ${_apiBase}characters/${id}?apikey=${_apiKey}
        `);
        return _transformCharacter(res.data.results[0]);
    }

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
    }

    return {loading, error, getAllCharacters, getCharacter, clearError};
};

export default useMarvelService;