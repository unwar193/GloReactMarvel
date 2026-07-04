import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    
    const {loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        if (!charId) return;
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    // Универсальное получение массива
    let comicsArray = [];
    if (comics) {
        if (Array.isArray(comics)) {
            comicsArray = comics;
        } else if (comics.items && Array.isArray(comics.items)) {
            comicsArray = comics.items;
        }
    }

    let imgStyle = { objectFit: 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description || 'No description available'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsArray.length > 0 ? (
                    comicsArray.slice(0, 10).map((item, i) => {
                        // Если элемент - строка
                        if (typeof item === 'string') {
                            return <li key={i} className="char__comics-item">{item}</li>;
                        }
                        // Если элемент - объект
                        const comicName = item.name || item.title || item.comicName || 'Unnamed comic';
                        return <li key={i} className="char__comics-item">{comicName}</li>;
                    })
                ) : (
                    <li>There is no comics with this character</li>
                )}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.string
};

export default CharInfo;