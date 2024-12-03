export const EditStarReview = ({stars, setStars, saveReview}) => {

    const handleEditStarReview = (index) => {
        const newStars = index + 1;
        setStars(newStars);
        saveReview(newStars);
    }

    return (
        <div>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleEditStarReview(index)}
                    style={{cursor: 'pointer', color: index < stars ? 'gold' : 'gray'}}
                >
        ★
      </span>
            ))}
        </div>
    )
};