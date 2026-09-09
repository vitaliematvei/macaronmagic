import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const starIndex = index + 1;
        return (
          <button
            type="button"
            key={starIndex}
            className={starIndex <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(starIndex)}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
            }}
            onMouseEnter={() => setHover(starIndex)}
            onMouseLeave={() => setHover(rating)}
            aria-label={`Rate ${starIndex} stars`}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
