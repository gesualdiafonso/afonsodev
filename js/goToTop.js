document.addEventListener('DOMContentLoaded', function () {
    const gototop = document.getElementById('gototop');
    const homeSection = document.querySelector('.home'); // Substitua ".home" pela sua classe correta

    window.addEventListener('scroll', () => {
        const homeHeight = homeSection.offsetHeight;

        if (window.scrollY > homeHeight) {
            gototop.classList.add('show');
            gototop.classList.remove('hide');
        } else {
            gototop.classList.add('hide');
            gototop.classList.remove('show');
        }
    });

    gototop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
