document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('cardsTrack');
    const cards = Array.from(track.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const logConsole = document.getElementById('logConsole');

    let currentIndex = 0;

    // Вспомогательная функция для добавления строк в системный лог
    function addLogMessage(msg) {
        const time = new Date().toLocaleTimeString();
        const p = document.createElement('p');
        p.textContent = `[${time}] ${msg}`;
        logConsole.appendChild(p);
        logConsole.scrollTop = logConsole.scrollHeight;
    }

    // Рассчитываем ширину сдвига карточки
    function getCardWidth() {
        if (cards.length === 0) return 0;
        const cardStyle = window.getComputedStyle(cards[0]);
        const gap = 20; // Из CSS gap
        return cards[0].offsetWidth + gap;
    }

    // Обновление позиции карусели
    function updateCarousel() {
        const visibleCards = cards.filter(card => card.style.display !== 'none');
        const maxIndex = Math.max(0, visibleCards.length - 1);
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const amountToMove = getCardWidth() * currentIndex;
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    // Кнопка Вперед
    nextBtn.addEventListener('click', () => {
        const visibleCards = cards.filter(card => card.style.display !== 'none');
        if (currentIndex < visibleCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Зацикливание по кругу
        }
        updateCarousel();
    });

    // Кнопка Назад
    prevBtn.addEventListener('click', () => {
        const visibleCards = cards.filter(card => card.style.display !== 'none');
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, visibleCards.length - 1); // Зацикливание по кругу
        }
        updateCarousel();
    });

    // Фильтрация по разделам Navbar
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            addLogMessage(`NAVIGATING TO SECTION: [${category.toUpperCase()}]`);

            currentIndex = 0;

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || category === 'home' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            updateCarousel();
        });
    });

    // Адаптивность при изменении размера окна
    window.addEventListener('resize', updateCarousel);
});