// Initialize variables for carousel functionality
let scrollPosition = 0;
const scrollAmount = 100;
const thumbnailRow = document.querySelector('.thumb-images .row');
let scrollInterval;
const scrollSpeed = 30;

// Add only the necessary additional styles while preserving existing ones
document.addEventListener('DOMContentLoaded', function() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .thumb-images {
            overflow: hidden;
        }
        .thumb-images .row {
            display: flex;
            transition: transform 0.3s ease-in-out;
            flex-wrap: nowrap;
        }
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            z-index: 2;
            border-radius: 4px;
            transition: background 0.3s ease;
        }
        .nav-button:hover {
            background: rgba(0,0,0,0.7);
        }
        .prev-button {
            left: 5px;
        }
        .next-button {
            right: 5px;
        }
    `;
    document.head.appendChild(styleSheet);
});

// Create and add navigation buttons
function createNavigationButtons() {
    const container = document.querySelector('.thumb-images');
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;';
    prevButton.className = 'nav-button prev-button';
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;';
    nextButton.className = 'nav-button next-button';
    
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    
    // Event listeners for buttons
    prevButton.addEventListener('mousedown', () => startScroll('left'));
    prevButton.addEventListener('mouseup', stopScroll);
    prevButton.addEventListener('mouseleave', stopScroll);
    
    nextButton.addEventListener('mousedown', () => startScroll('right'));
    nextButton.addEventListener('mouseup', stopScroll);
    nextButton.addEventListener('mouseleave', stopScroll);

    // Touch events for mobile
    prevButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startScroll('left');
    });
    prevButton.addEventListener('touchend', stopScroll);

    nextButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startScroll('right');
    });
    nextButton.addEventListener('touchend', stopScroll);
}

// Scroll function
function scroll(direction) {
    const containerWidth = thumbnailRow.parentElement.offsetWidth;
    const scrollWidth = thumbnailRow.scrollWidth;
    
    if (direction === 'right') {
        scrollPosition += scrollAmount;
        if (scrollPosition > scrollWidth - containerWidth) {
            scrollPosition = scrollWidth - containerWidth;
        }
    } else {
        scrollPosition -= scrollAmount;
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
    }
    
    thumbnailRow.style.transform = `translateX(-${scrollPosition}px)`;
}

// Start scrolling
function startScroll(direction) {
    stopScroll(); // Clear any existing interval
    scrollInterval = setInterval(() => scroll(direction), scrollSpeed);
}

// Stop scrolling
function stopScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// Check if scrolling is needed
function checkScrollability() {
    const container = document.querySelector('.thumb-images');
    const row = container.querySelector('.row');
    const buttons = container.querySelectorAll('.nav-button');
    
    if (row.scrollWidth <= container.offsetWidth) {
        buttons.forEach(button => button.style.display = 'none');
    } else {
        buttons.forEach(button => button.style.display = 'block');
    }
}

// Initialize carousel and add window resize listener
document.addEventListener('DOMContentLoaded', function() {
    createNavigationButtons();
    checkScrollability();
    
    window.addEventListener('resize', function() {
        checkScrollability();
        // Reset position on resize
        scrollPosition = 0;
        thumbnailRow.style.transform = `translateX(0)`;
    });
});