import React from 'react';

function Raiting(props) {
    const {raiting, numReviews, caption} = props;

    return (
        <div className="card__raiting">
            <span><i className={
                raiting >= 1
                ? "bi bi-star-fill"
                : raiting >= 0.5
                ? 'bi bi-star'
                : 'bi bi-stal-half'
                }
                ></i></span>

            <span><i className={
                raiting >= 2
                ? "bi bi-star-fill"
                : raiting >= 1.5
                ? 'bi bi-star'
                : 'bi bi-stal-half'
                }
                ></i></span>

            <span><i className={
                raiting >= 3
                ? "bi bi-star-fill"
                : raiting >= 2.5
                ? 'bi bi-star'
                : 'bi bi-stal-half'
                }
                ></i></span>

            <span><i className={
                raiting >= 4
                ? "bi bi-star-fill"
                : raiting >= 3.5
                ? 'bi bi-star'
                : 'bi bi-stal-half'
                }
                ></i></span>

            <span><i className={
                raiting >= 5
                ? "bi bi-star-fill"
                : raiting >= 4.5
                ? 'bi bi-star'
                : 'bi bi-stal-half'
                }
                ></i></span>
            {caption ? (<span>{caption}</span>) : (<span> {numReviews} </span>)}
        </div>
    );
}

export default Raiting;