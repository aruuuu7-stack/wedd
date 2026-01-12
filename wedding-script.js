// Плавная прокрутка между страницами
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    const pages = document.querySelectorAll('.page');
    const currentPage = Array.from(pages).findIndex(page => {
        const rect = page.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });
    
    let targetPage;
    if (e.deltaY > 0 && currentPage < pages.length - 1) {
        targetPage = currentPage + 1;
    } else if (e.deltaY < 0 && currentPage > 0) {
        targetPage = currentPage - 1;
    } else {
        isScrolling = false;
        return;
    }
    
    pages[targetPage].scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        isScrolling = false;
    }, 800);
});

// Обработка формы
document.getElementById('invitationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const guests = formData.get('guests');
    const allergies = formData.getAll('allergy');
    const allergyDetails = formData.get('allergy-details');
    
    // Здесь можно отправить данные на сервер
    console.log('Гости:', guests);
    console.log('Аллергии:', allergies);
    console.log('Подробности:', allergyDetails);
    
    // Показываем сообщение
    alert('Спасибо! Ваша информация сохранена. Мы ждём вас на свадьбе!');
    
    // Переходим на последнюю страницу
    document.getElementById('page5').scrollIntoView({ behavior: 'smooth' });
});

// Музыка
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

let musicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<span class="music-icon">🎵</span>';
        musicPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
            musicPlaying = true;
        }).catch(err => {
            console.log('Автовоспроизведение заблокировано');
            alert('Пожалуйста, нажмите на кнопку музыки ещё раз для включения');
        });
    }
});

// Попытка автоматического включения музыки (может не работать из-за политики браузера)
document.addEventListener('click', () => {
    if (!musicPlaying) {
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
            musicPlaying = true;
        }).catch(() => {
            // Автовоспроизведение заблокировано - нормально
        });
    }
}, { once: true });

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.page-content').forEach(content => {
    observer.observe(content);
});

// Обработка навигации с клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const pages = document.querySelectorAll('.page');
        const currentPage = Array.from(pages).findIndex(page => {
            const rect = page.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        if (currentPage < pages.length - 1) {
            pages[currentPage + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const pages = document.querySelectorAll('.page');
        const currentPage = Array.from(pages).findIndex(page => {
            const rect = page.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        if (currentPage > 0) {
            pages[currentPage - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});
