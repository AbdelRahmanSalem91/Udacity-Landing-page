
// Global Variables
const navMenu = document.getElementById('menu'),
    sectionsList = document.querySelectorAll('section'),
    scrollButton = document.querySelector("button");

// Creating the Navbar Menu
const navUl = document.createElement('ul');
const listFragment = new DocumentFragment();

sectionsList.forEach(section => {
    const navLi = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.setAttribute("href", "#" + section.dataset.nav)
    navLink.setAttribute("data-nav", section.dataset.nav)
    const navLinkText = document.createTextNode(section.dataset.nav);

    navLink.appendChild(navLinkText);
    navLi.appendChild(navLink);
    navUl.appendChild(navLi)
    listFragment.appendChild(navUl);
})
navMenu.appendChild(listFragment)

// Adding Active Class to the Link
navMenu.addEventListener("click", e =>{
    e.preventDefault();
    e.target.parentElement.parentElement.querySelectorAll(".active").forEach(active => {
        active.classList.remove("active")
    })
    e.target.classList.add("active")
    document.querySelector("#" + e.target.dataset.nav).scrollIntoView({
        behavior: 'smooth'
    })
})

// Adding Active Class to the displayed Section
const SectionOptions = {
    threshold: 0.5
};

const sectionObserver = new IntersectionObserver((sections, sectionObserver) => {
    sections.forEach(section => {
        if(!section.isIntersecting){
            section.target.classList.remove("active")
        } else {
            section.target.classList.add("active")

            // Adding Active Class to the link of the displayed Section
            const navigationList = document.querySelectorAll("#menu a");
            navigationList.forEach(link => {
                if(link.dataset.nav === section.target.dataset.nav){
                link.parentElement.parentElement.querySelectorAll(".active").forEach(active => {
                    active.classList.remove("active")
                })
                    link.classList.add("active")
                }
            })
        }
})
    
}, SectionOptions)

sectionsList.forEach(section => {
    sectionObserver.observe(section);
})


const skillSec = document.querySelector(".skills .skills-box");

window.onscroll = () => {
    const skillsOffsetTop = skillSec.offsetTop;
    const skillsOuterHeight = skillSec.offsetHeight;
    const windowHeight = this.innerHeight;
    const mypageYOffset = this.pageYOffset;

  if(mypageYOffset > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    document.querySelectorAll(".bg-prog .prog").forEach(element =>{
      element.style.width = element.dataset.width;
    })
  }
  window.pageYOffset >= 450 ? scrollButton.style.display = "block" : scrollButton.style.display = "none"
}

scrollButton.onclick = () => {
    window.scrollTo(0, 0)
}


// Hide Navbar while no scrolling
let scrollTimer = null;

const hideNav = () => {
	if(scrollTimer !== null) {
    clearTimeout(scrollTimer);
    document.querySelector("header").classList.remove("hide")
  }
  scrollTimer = setTimeout(() => {
  	document.querySelector("header").classList.add("hide")
  	if (window.pageYOffset < window.innerHeight * 0.4) {
        document.querySelector("header").classList.remove("hide")
  	}
  }, 5000);
};

setTimeout( () => {
	document.addEventListener('scroll', () => {
    hideNav();
  });
}, 2000);