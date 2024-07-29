document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (name.value === '' || email.value === '' || message.value === '') {
            e.preventDefault();
            alert('All fields are required.');
        }
    });

    // Optional: Enhance horizontal scrolling
    const projectsContainer = document.querySelector('.projects-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsContainer.classList.add('active');
        startX = e.pageX - projectsContainer.offsetLeft;
        scrollLeft = projectsContainer.scrollLeft;
    });

    projectsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        projectsContainer.classList.remove('active');
    });

    projectsContainer.addEventListener('mouseup', () => {
        isDown = false;
        projectsContainer.classList.remove('active');
    });

    projectsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsContainer.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        projectsContainer.scrollLeft = scrollLeft - walk;
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
        skillBar.setAttribute('data-width', skillBar.style.width);
        skillBar.style.width = '0';
    });
});
