const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (scrollY >= 180) {
        navbar.classList.add('bg');

    } else {
        navbar.classList.remove('bg');
    }
})

//image collage

const colllageImages = [...document.querySelectorAll(".collage-img")]

colllageImages.map((item, i) => {
    item.addEventListener('mouseover', () => {
        colllageImages.map((image, index) => {
            if (index != i) {
                image.style.filter = `blur(10px)`;
                item.style.zIndex = 2;
            }
        })
    })
    item.addEventListener('mouseleave', () => {
        colllageImages.map((image, index) => {
                image.style = null;
        })
    })
})