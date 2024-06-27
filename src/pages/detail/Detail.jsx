import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';

const Detail = () => {
    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.detail(category, id, { params: {} });
                setItem(response);

                const reviewResponse = await tmdbApi.getReviews(category, id);
                setReviews(reviewResponse.results);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
            window.scrollTo(0, 0);
        };

        getDetail();
    }, [category, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {item && (
                <>
                    <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className="title">
                                {item.title || item.name}
                            </h1>
                            <div className="genres">
                                {item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                    <span key={i} className="genres__item">{genre.name}</span>
                                ))}
                            </div>
                            <div className="ratings">
                                Ratings: {item.vote_average.toFixed(1)} ({item.vote_count})
                            </div>
                            <p className="overview">{item.overview}</p>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={item.id} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                       <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Reviews</h2>
                            </div>
                            <div className="reviews">
                                {reviews.length > 0 ? (
                                    reviews.map((review, i) => (
                                        <div key={i} className="reviews__item">
                                            <h3 className="reviews__item__author">{review.author}</h3>
                                            <p className="reviews__item__content" dangerouslySetInnerHTML={{ __html: review.content }}></p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Similar</h2>
                            </div>
                            <MovieList category={category} type="similar" id={item.id} />
                        </div>
                        
                        <div className="section mb-3">
                            <VideoList id={item.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Detail;
