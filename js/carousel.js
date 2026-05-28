(function () {
    const performanceImages = [
        { src: "images/rt1.png", alt: "e-WASH Characteristics" },
        { src: "images/rt2.png", alt: "e-WASH Functions" },
        { src: "images/rt3.png", alt: "e-WASH Abilities" },
        { src: "images/rt4.png", alt: "e-WASH Core Values" },
        { src: "images/EI.png", alt: "Environmental Impact" },
        { src: "images/DES.png", alt: "DESEI Model" }
    ];

    const tabs = document.querySelectorAll('.perf-tab-btn');
    const descContent = document.querySelector('.desc-content');
    const descImage = document.getElementById('desc-image');

    if (!tabs.length || !descContent || !descImage) {
        return;
    }

    let currentIndex = 0;
    let autoPlay = null;

    function updateView(index) {
        currentIndex = index % performanceImages.length;

        // Update active class on buttons (if corresponding tab exists)
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Fade effect for image change
        descContent.classList.add('fade-out');

        setTimeout(() => {
            descImage.src = performanceImages[currentIndex].src;
            descImage.alt = performanceImages[currentIndex].alt;
            descContent.classList.remove('fade-out');
        }, 300);
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const index = parseInt(tab.getAttribute('data-index'));
            updateView(index);
            // reset autoplay so user interaction pauses/resets rotation
            if (autoPlay) {
                clearInterval(autoPlay);
                autoPlay = setInterval(() => updateView((currentIndex + 1) % performanceImages.length), 4000);
            }
        });
    });

    // Initialize with first tab/image
    updateView(0);

    // Auto-rotate through images every 4s
    autoPlay = setInterval(() => {
        updateView((currentIndex + 1) % performanceImages.length);
    }, 4000);
})();