import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

import './comicPage.scss';

const ComicPage = () => {
    const [comic, setComic] = useState(null);    
    const {loading, error, getComic, clearError} = useMarvelService();
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        if (!comicId) {
            return;
        }

        clearError();
        getComic(comicId)
            .then((comic) => setComic(comic))
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    );
};

export default ComicPage;