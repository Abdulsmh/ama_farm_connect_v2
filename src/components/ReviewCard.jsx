export function ReviewCard({ review }) {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<i key={i} className="fas fa-star text-yellow-400 text-xs"></i>);
            } else if (hasHalfStar && i === fullStars + 1) {
                stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400 text-xs"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-yellow-400 text-xs"></i>);
            }
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-green-600 text-sm md:text-base"></i>
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h4 className="font-medium text-gray-800 text-sm">{review.userName}</h4>
                        <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                        {renderStars(review.rating)}
                    </div>
                    
                    <p className="text-gray-600 text-xs md:text-sm mb-2">{review.comment}</p>
                    
                    {review.verifiedPurchase && (
                        <div className="flex items-center text-green-600 text-xs">
                            <i className="fas fa-check-circle mr-1"></i>
                            <span>Verified Purchase</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}