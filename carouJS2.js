class Picture {
    constructor(source) {
    this.source = source}

    info() {
        console.log(this.source)
    }
}

const container = document.querySelector('.container')
const gallery = document.createElement('div')
gallery.setAttribute('id', 'gallery')
container.appendChild(gallery)

let first = new Picture('./images/one.webp')
let second = new Picture('./images/two.jpg')
let third = new Picture('./images/three.jpg')
let fourth = new Picture('./images/four.webp')
let fifth = new Picture('./images/five.jpg')

let pictures = [first, second, third, fourth, fifth]

let i = 0;
let x = 0;

for (picture in pictures) {
    picture = document.createElement('img')
    picture.setAttribute('src', `${pictures[i].source}`)
    picture.classList.add('gallery')
    gallery.appendChild(picture)
    i++
}

leftButton = document.createElement('button')
rightButton = document.createElement('button')

leftButton.classList.add('leftnavButton')
rightButton.classList.add('rightnavButton')
leftButton.classList.add('navButton')
rightButton.classList.add('navButton')
leftButton.innerHTML = "←"
rightButton.innerHTML = "→"

container.appendChild(leftButton)
container.appendChild(rightButton)
const galleryHUD = document.createElement('div')
galleryHUD.classList.add('galleryHUD')

let ticker = 0;
for (picture in pictures) {
    picture = document.createElement('button')
    picture.classList.add('hudButton')
    picture.setAttribute('data-value', `${ticker}`)
    galleryHUD.appendChild(picture)
    ticker++;
}

container.appendChild(galleryHUD)

const hud = document.querySelectorAll('.hudButton')

hud.forEach((button) => {
    button.addEventListener('click', (e) => {
    x = +button.dataset.value;
    slide(x) })
})

leftButton.addEventListener('click', (e) => {
    if (x === 0) {x = (pictures.length - 1)} else {x--};
    slide(x)
})

rightButton.addEventListener('click', (e) => {
    if (x === (pictures.length - 1)) {x = 0} else {x++;};
    slide(x);
})

function slide(x) {
    let galleryPosition = (x) * (-100);
    gallery.style.left = `${galleryPosition}%`;
    updateHUD(x)
}

function updateHUD(x) {
    hud.forEach((bubble) => {
        bubble.classList.remove('activeBubble')
    })
    hud[x].classList.add('activeBubble')
}

updateHUD(x)
slide(x)

slideTimer = setInterval(function(){
    if (x === (pictures.length - 1)) {x = 0} else {x++;};
    slide(x)
}, 5000);

allButtons = document.querySelectorAll('button')
allButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        clearInterval(slideTimer);
        slideTimer = setInterval(function(){
            if (x === (pictures.length - 1)) {x = 0} else {x++;};
            slide(x)
        }, 5000);
    })
})