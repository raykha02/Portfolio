/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */
const header = document.querySelector("header");

function stickyNavBar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0)
}

stickyNavBar();

window.addEventListener("scroll", stickyNavBar)



/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal({
   duration: 2500,
   distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top" , delay: 700});

/* --------------- Skills Progress Bar Animation --------------- */
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", ()=>{
    activeLink();
    if(!skillsPlayed){
        skillsCounter();
    }

})

function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    
    if(window.innerHeight >= topPosition + el.offsetHeight){
        return true;
    } 
    return false;
    
}
function updateCount(num,maxnum){
    let currentNum = +num.innerText;

    if(currentNum < maxnum){
        num.innerText = currentNum + 1 ;
        setTimeout(() =>{
            updateCount(num,maxnum);

        }, 12)
    }
}

let skillsPlayed = false;



function skillsCounter(){
    if(!hasReached(first_skill)){
        return;
    }
    skillsPlayed = true;
    sk_counters.forEach((counter, i) =>{
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target/100);
        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() =>{
            updateCount(counter,target);
        }, 400);
    });

    progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"))
}

/* --------------- Services Counter Animation --------------- */

/* --------------- Portfolio Filter Animation --------------- */
let mix = mixitup(".portfolio-gallery", {
    selectors: {
        target: ".prt-card",
    },
    animation: {
        duration:500,
    }
});

/* --------------- Modal Pop Up Animation Animation --------------- */

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
let currentIndex = 0 ;
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

zoom_icons.forEach( (icn,i) => 
    icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i ;
    changeImage(currentIndex);
})
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}

 );

prev_btn.addEventListener("click", () => {
    if(currentIndex === 0 ){
        currentIndex = 5;
    } else {
        currentIndex--;
    }

    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if(currentIndex === 5 ){
        currentIndex = 0;
    } else {
        currentIndex++;
    }

    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/* --------------- Modal Pop Up Animation Animation --------------- */

/* --------------- Change Active Link On Scroll --------------- */
const links = document.querySelectorAll(".nav-link");

function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
    .map((sct,i) => {
        return{
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })
        .filter((sct) => sct.y <= 0);

    let currSectionID = passedSections.at(-1).id

    links.forEach((l)=> l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();
/* --------------- Change Page Theme --------------- */

/* --------------- Open & Close Navbar Menu --------------- */
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

links.forEach(link => link.addEventListener("click"), () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
})






