import { useState, useEffect } from 'react';

export function TypingAnimation({ 
    texts = [
        "Fresh Products From Farm 🚜",
        "Enjoy organic products from natural farm 🌱",
        "Straight from nature to your table 🍅",
        "Farm fresh, naturally grown 🌿",
        "Taste the difference of organic 🥕"
    ], 
    typeSpeed = 100,
    deleteSpeed = 50,
    delayBetweenTexts = 2000,
    className = '' 
}) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    // Typing and deleting effect
    useEffect(() => {
        const currentText = texts[currentIndex];
        
        const timeout = setTimeout(() => {
            if (isDeleting) {
                // Deleting text
                setDisplayText(currentText.substring(0, displayText.length - 1));
                
                // If finished deleting, move to next text
                if (displayText.length === 1) {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                // Typing text
                setDisplayText(currentText.substring(0, displayText.length + 1));
                
                // If finished typing, start deleting after delay
                if (displayText.length === currentText.length) {
                    setTimeout(() => setIsDeleting(true), delayBetweenTexts);
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting, texts, typeSpeed, deleteSpeed, delayBetweenTexts]);

    return (
        <span className={className}>
            {displayText}
            <span 
                className="ml-1 text-green-600 font-bold" 
                style={{ opacity: showCursor ? 1 : 0 }}
            >
                |
            </span>
        </span>
    );
}