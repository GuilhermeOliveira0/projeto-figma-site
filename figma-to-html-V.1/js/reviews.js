// ========================================
// REVIEWS MANAGEMENT SYSTEM
// UI Pattern: Rate Content
// ========================================

class ReviewsManager {
    constructor() {
        this.currentRating = 0;
        this.reviews = this.loadReviews();
        this.initStarRating();
        this.initReviewForm();
    }

    // Initialize star rating input
    initStarRating() {
        const stars = document.querySelectorAll('.star');
        
        stars.forEach(star => {
            star.addEventListener('click', () => {
                this.currentRating = parseInt(star.dataset.rating);
                this.updateStarDisplay();
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                this.highlightStars(rating);
            });
        });

        const container = document.querySelector('.star-rating-input');
        if (container) {
            container.addEventListener('mouseleave', () => {
                this.updateStarDisplay();
            });
        }
    }

    // Highlight stars on hover
    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.textContent = '★';
                star.style.color = '#ffa500';
            } else {
                star.textContent = '☆';
                star.style.color = '#ddd';
            }
        });
    }

    // Update star display based on current rating
    updateStarDisplay() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < this.currentRating) {
                star.textContent = '★';
                star.classList.add('active');
            } else {
                star.textContent = '☆';
                star.classList.remove('active');
            }
        });
    }

    // Initialize review form
    initReviewForm() {
        const form = document.getElementById('reviewForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }
    }

    // Submit a new review
    submitReview() {
        if (this.currentRating === 0) {
            alert('Por favor, selecione uma classificação por estrelas');
            return;
        }

        const name = document.getElementById('reviewerName').value.trim();
        const text = document.getElementById('reviewText').value.trim();

        if (!name || !text) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        const review = {
            id: Date.now(),
            name: name,
            rating: this.currentRating,
            text: text,
            date: new Date().toLocaleDateString('pt-BR'),
            helpful: 0
        };

        this.reviews.push(review);
        this.saveReviews();
        this.addReviewToDOM(review);
        this.showSuccessMessage();
        this.resetForm();
        this.updateRatingSummary();
    }

    // Add review to DOM
    addReviewToDOM(review) {
        const reviewsContainer = document.getElementById('courseReviews');
        if (!reviewsContainer) return;

        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="review-header">
                <h4>
                    ${this.escapeHtml(review.name)}
                    <span class="rating">${this.getStarString(review.rating)}</span>
                </h4>
                <span class="review-date">${review.date}</span>
            </div>
            <p>${this.escapeHtml(review.text)}</p>
            <div class="review-actions">
                <button class="helpful-btn" onclick="reviewsManager.markHelpful(${review.id})">
                    <span>👍</span> Útil (${review.helpful})
                </button>
            </div>
        `;

        reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);
    }

    // Display all reviews
    displayReviews() {
        const reviewsContainer = document.getElementById('courseReviews');
        if (!reviewsContainer) return;

        reviewsContainer.innerHTML = '';
        this.reviews.forEach(review => this.addReviewToDOM(review));
    }

    // Get star string based on rating
    getStarString(rating) {
        const fullStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return fullStars + emptyStars;
    }

    // Mark review as helpful
    markHelpful(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            review.helpful++;
            this.saveReviews();
            this.displayReviews();
        }
    }

    // Update rating summary statistics
    updateRatingSummary() {
        if (this.reviews.length === 0) return;

        const totalReviews = this.reviews.length;
        const sumRatings = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = (sumRatings / totalReviews).toFixed(1);

        // Count ratings
        const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        this.reviews.forEach(review => {
            ratingCounts[review.rating]++;
        });

        // Update average rating display
        const avgElement = document.getElementById('averageRating');
        if (avgElement) avgElement.textContent = avgRating;

        const totalElement = document.getElementById('totalRatings');
        if (totalElement) totalElement.textContent = `${totalReviews} avaliações`;

        // Update rating bars
        Object.keys(ratingCounts).forEach(star => {
            const percentage = ((ratingCounts[star] / totalReviews) * 100).toFixed(0);
            const bars = document.querySelectorAll('.rating-bar');
            const index = 5 - parseInt(star);
            if (bars[index]) {
                bars[index].style.width = percentage + '%';
                const percentageSpans = document.querySelectorAll('.rating-percentage');
                if (percentageSpans[index]) {
                    percentageSpans[index].textContent = percentage + '%';
                }
            }
        });
    }

    // Show success message
    showSuccessMessage() {
        const form = document.getElementById('reviewForm');
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '✓ Avaliação enviada com sucesso!';
        form.parentNode.insertBefore(message, form);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Reset form
    resetForm() {
        document.getElementById('reviewForm').reset();
        this.currentRating = 0;
        this.updateStarDisplay();
    }

    // Load reviews from localStorage
    loadReviews() {
        const stored = localStorage.getItem('courseReviews');
        return stored ? JSON.parse(stored) : [];
    }

    // Save reviews to localStorage
    saveReviews() {
        localStorage.setItem('courseReviews', JSON.stringify(this.reviews));
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize reviews manager when DOM is loaded
let reviewsManager;
document.addEventListener('DOMContentLoaded', () => {
    reviewsManager = new ReviewsManager();
    reviewsManager.displayReviews();
    reviewsManager.updateRatingSummary();
});

// Tab switching function
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    if (evt) evt.currentTarget.classList.add('active');
}
