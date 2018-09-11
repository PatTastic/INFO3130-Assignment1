var Home = {};
Home.Load = function(){
    // Events
    $(".to-about").on("click", function(e){
        location.hash = '#about';
    });

    // Particle setup
    particlesJS('particles-js', {
        particles: {
            color: '#fecf2d',
            shape: 'circle',
            opacity: 0.8,
            size: 8,
            size_random: true,
            nb: 30,
            line_linked: {
                enable_auto: true,
                distance: 100,
                color: '#7FB800',
                width: 2,
                condensed_mode: {
                    enable: true,
                    rotateX: 10,
                    rotateY: 30
                }
            },
            anim: {
                enable: true,
                speed: 2
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 200
            },
            mode: 'grab'
        },
        retina_detect: true
    });

    // var c = document.getElementsByTagName("canvas")[0];
    // c.height = 900;
    // $("#particles-js canvas").height(900);
    // $(window).trigger("resize");
};
