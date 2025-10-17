function showSection(sectionId) {
    document.getElementById('introduce').classList.add('hidden');
    document.getElementById('structure').classList.add('hidden');
    document.getElementById('activity').classList.add('hidden');
    document.getElementById('contact').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

// 轮播图功能（包含自动轮播）
document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-inner img');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval; // 自动轮播定时器

    // 初始化轮播宽度（响应式）
    function updateSlideWidth() {
        const slideWidth = carouselInner.parentElement.offsetWidth;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    }

    // 更新轮播显示
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // 启动自动轮播（5秒切换一次）
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // 停止自动轮播
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 初始化
    updateSlideWidth();
    startAutoplay();

    // 事件监听
    nextBtn.addEventListener('click', () => {
        stopAutoplay(); // 点击时暂停自动轮播
        nextSlide();
        startAutoplay(); // 完成切换后重新启动
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            currentIndex = index;
            updateCarousel();
            startAutoplay();
        });
    });

    // 窗口大小变化时重新计算宽度
    window.addEventListener('resize', () => {
        updateSlideWidth();
        updateCarousel();
    });

    // 鼠标悬停时暂停自动轮播，离开时恢复
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
});