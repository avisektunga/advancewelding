document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.directory-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h2').textContent;
            alert(`You clicked on ${title}`);
            // In a real application, you would navigate to the respective page:
            // window.location.href = `/${title.toLowerCase().replace(/\s+/g, '-')}.html`;
        });
    });
});
