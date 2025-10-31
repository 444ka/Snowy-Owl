// ------ GSAP Animation plugins ----------------------------------
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin
gsap.registerPlugin(SplitText);  // Register SplitText plugin
gsap.registerPlugin(MotionPathPlugin); // Register MotionPath plugin

// ================== SECTIONS =====================================

// ------- Wings Section: Carousel Dialog (ShoeLace) --------------
const wingsBtn = document.querySelector("#wings-btn");
const flightDialog = document.querySelector("#flight-dialog");
wingsBtn.addEventListener('click', () => {
     flightDialog.show(); // opens the Shoelace dialog
});
// ------- Eyes Section: Info Dialog ------------------------------
const eyesBtn = document.querySelector("#eyes-btn");
const eyesDialog = document.querySelector("#eyes-dialog");
eyesBtn.addEventListener('click', () => {
     eyesDialog.show(); // opens the Shoelace dialog
});

// ------- Diurnal Section: Toggle --------------------------------
const diurnalsection = document.querySelector(".fun-fact-diurnal");
const diurnalBtn = document.querySelector('#diurnal-btn');

diurnalBtn.addEventListener('click', () => {
    diurnalsection.classList.toggle('active');
});
// ------- Tundra Section: Toggle ----------------------------------
const tundraSection = document.querySelector(".fun-fact-tundra");
const tundraBtn = document.querySelector("#tundra-btn");
const mapDialog = document.querySelector("#map-dialog");

tundraBtn.addEventListener('click', ()=> {
    tundraSection.classList.toggle('active');
    mapDialog.show(); // opens the Shoelace dialog
})

// ------- Cards flipping functionality -----------------------------
const cards = document.querySelectorAll('.flip-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ================== ANIMATIONS ====================================
// ------- Feather falling animation ------------------------------
// Array of feather elements
const feathers = [
    document.querySelector("#feather-1"),
    document.querySelector("#feather-2"),
    document.querySelector("#feather-3"),
];

// Initial setup of feathers
feathers.forEach((feather) => { // target each feather in the array
    resetFeather(feather); 
    animateFeather(feather);
});

// Name: resetFeather
// Desscription: Sets the intial postition of the feather randomly
// Parameters: el - DOM element to animate
// Returns: None
function resetFeather(el) {
    gsap.set(el, {
        x: gsap.utils.random(0, window.innerWidth), // start at random horizontal position
        y: gsap.utils.random(-200, -300), // slightly off-screen above
        scale: gsap.utils.random(0.9, 1.6), // varied feather sizes
        rotation: gsap.utils.random(-30, 30) // slight initial tilt
    });
}

// Name: animateFeather
// Description: Continuous falling animation for feather elements
// Parameters: el - DOM element to animate
// Returns: None
function animateFeather(el) {
    
    gsap.to(el, {
        motionPath: [
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 1}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 2}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 3}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 4}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 5}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 6}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 7}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 8}, 
            {x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight * 10}],
        y: document.body.scrollHeight + 50,
        duration: gsap.utils.random(40, 60), // Random duration for varied speeds
        onComplete: () => {
            resetFeather(el); // Reset position and properties
            animateFeather(el); // Restart animation
        },
    
        rotation: 360, // Full rotation
        transformOrigin: "left center",
        ease: "none", // Constant speed
        repeat: -1, // Repeat

});
}
// ------- Text animation ---------------------------------------
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
