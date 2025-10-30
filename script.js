// GSAP Animation plugins
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin
gsap.registerPlugin(SplitText);  // Register SplitText plugin
gsap.registerPlugin(MotionPathPlugin); // Register MotionPath plugin

// Feather falling animation
const feathers = [
    document.querySelector('#feather-1'),
    document.querySelector('#feather-2'),
    document.querySelector('#feather-3')
];

// Initial setup
feathers.forEach((feather) => {
    resetFeather(feather);
    animateFeather(feather);
});

function resetFeather(el) {
    gsap.set(el, {
        x: gsap.utils.random(0, window.innerWidth), // start at random horizontal position
        y: gsap.utils.random(-600, -300), // slightly off-screen above
        scale: gsap.utils.random(0.1, 1.6), // varied feather sizes
        rotation: gsap.utils.random(-30, 30) // slight initial tilt
    });
}

// TODO: Adjust animation for each feather, maybe add variations in speed and path using bezier 

// Name: animateFeather
// Description: Continuous falling animation for feather elements
// Parameters: el - DOM element to animate
// Returns: None
function animateFeather(el) {
    
    gsap.to(el, {
        motionPath: [
            {x: gsap.utils.random(50, 150), y: gsap.utils.random(50, 150)}, 
            {x: gsap.utils.random(0, 300), y: gsap.utils.random(150, 300)}, 
            {x: gsap.utils.random(300, 450), y: gsap.utils.random(300, 450)}],
        duration: 10, 
        y: window.innerHeight + 1000, // Moves from the top to beyond the section
        
        rotation: 360, // Full rotation
        transformOrigin: "left center",
        ease: "none", // Constant speed
        repeat: -1, // Repeat

});
}

// Name: animateText
// Description: Simple, fixed animation for heading text
// Parameters: el - DOM element to animate
// Returns: Object containing SplitText instance and timeline
function animateText(el) {
    const split = new SplitText(el, { type: "chars" }); // Split text into characters

    const tl = gsap.timeline({ // GSAP timeline for animation
        defaults: { duration: 0.8, ease: "circ.inOut" }, 
        scrollTrigger: { // ScrollTrigger settings
            trigger: el,
            start: "top 80%",   // when top of element hits 80% of viewport
            toggleActions: "play none none reverse",
        }
    });

    // Animation: characters fly in from below with rotation
    tl.from(split.chars, { 
        y: 100,
        rotationX: 90,
        opacity: 0,
        stagger: 0.08,
        transformOrigin: "center top",
        perspective: 700,
    }).to(
        split.chars, {
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out"
            },
            "-=0.9"
    );

    return { split, tl }; 
}

// Apply same animation to headings
animateText(document.querySelector(".hero-text h1")); // Website title
animateText(document.querySelector(".intro .text-group h3")); // Intro / transition
animateText(document.querySelector(".fun-fact-wings h2")); // Fun Fact 1
animateText(document.querySelector(".fun-fact-eyes h2")); // Fun Fact 2
animateText(document.querySelector(".fun-fact-diurnal h2")); // Fun Fact 3
animateText(document.querySelector(".fun-fact-tundra h2")); // Fun Fact 4
animateText(document.querySelector(".fun-fact-map h3")); // Fun Fact 5
animateText(document.querySelector(".fun-fact-feet h2")); // Fun Fact 6
animateText(document.querySelector(".quiz .text-group h2")); // Quiz section

// Diurnal section transition
const section = document.querySelector('.fun-fact-diurnal');
const button = document.querySelector('#interact-btn');

button.addEventListener('click', () => {
    section.classList.toggle('active');
});