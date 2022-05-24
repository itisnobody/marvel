

class MarvelService {
    _apiKey = '5a8f71d8c8c142aa3b9e3f8ebb09b700';
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`
            ${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}
        `);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}
        `);
    }

    

}

export default MarvelService;