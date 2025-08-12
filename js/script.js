let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
}

let header = document.querySelector('header');

header.classList.toggle('sticky', window.scrollY > 100);

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = Array.from(track.children);
  const cardWidth = cards[0].getBoundingClientRect().width;

  let currentIndex = 0;

  // Define posição inicial dos cards (se quiser deixar alinhado)
  // cards.forEach((card, index) => {
  //   card.style.left = cardWidth * index + 'px';
  // });

  function moveToIndex(index) {
    // Limitar índice entre 0 e o máximo que cabe
    if (index < 0) {
      currentIndex = 0;
    } else if (index > cards.length - visibleCards()) {
      currentIndex = cards.length - visibleCards();
    } else {
      currentIndex = index;
    }
    const moveAmount = cardWidth * currentIndex;
    track.style.transform = `translateX(-${moveAmount}px)`;
  }

  function visibleCards() {
    const vw = window.innerWidth;
    if (vw < 500) return 1;
    if (vw < 900) return 2;
    return 4;
  }

  prevBtn.addEventListener('click', () => {
    moveToIndex(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    moveToIndex(currentIndex + 1);
  });

  window.addEventListener('resize', () => {
    // Recalcula a largura e reposiciona no resize
    const newCardWidth = cards[0].getBoundingClientRect().width;
    if (newCardWidth !== cardWidth) {
      moveToIndex(currentIndex);
    }
  });