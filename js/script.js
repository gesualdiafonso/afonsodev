window.onload = function () {
    Particles.init({
        selector: ".background"
    });
};

const particles = Particles.init({
    selector: ".background",
    color: ["#007bff", "#00ccff", "#ffffff", "#00ff99"],
    connectParticles: true,
    responsive: [
        {
            breakpoint: 768,
            options: {
                color: ["#007bff", "#00ccff", "#ffffff", "#00ff99"],
                maxParticles: 43,
                connectParticles: false,
            },
        },
    ],
});
