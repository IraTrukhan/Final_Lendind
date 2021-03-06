'use strict';

function drawGraph() {
   const canvases = document.querySelectorAll('.about__canvas');

   const welcomeSection = document.querySelector('.welcome');
   const aboutSection = document.querySelector('.about');
   

   if (welcomeSection.clientHeight === aboutSection.offsetTop) {
      canvases.forEach(item => {
         let progress = 0;
         let timer;
         const canvas = item;
         const ctx = canvas.getContext('2d');
         const x = canvas.width / 2;
         const y = canvas.height / 2;
         const radius = 100;
         const startAngle = 1.5 * Math.PI;
         const value = parseInt(canvas.previousElementSibling.innerHTML);
         const counterClockwise = false;

         ctx.lineWidth = 10;
         ctx.strokeStyle = '#f2c351';
         ctx.stroke();

         function drawText(x, y, text, ctx) {
            ctx.font = "30px Arial";
            ctx.fillText(text, x, y);
         }

         function removeText(x, y, txt_length, font_height, char_width, ctx) {
            ctx.clearRect(x, y - font_height, char_width * txt_length, font_height);
         }

         timer = setInterval(() => {
            window.removeEventListener('scroll', drawGraph)
            let procent = progress * 2 / 100;
            let endAngle = (procent + 1.5) * Math.PI;
            let text = `${Math.abs(progress - 1)}%`;



            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
            ctx.stroke();
            removeText(105, 140, text.length, 24, 20, ctx)

            drawText(105, 140, text, ctx)
            if (progress > value) {
               clearInterval(timer);
            }
            progress++;
         }, 60);
      })
   }
}

window.addEventListener('scroll', drawGraph);





const header = document.getElementById('header');

window.addEventListener('scroll', onScroll);

function onScroll() {
   if (window.pageYOffset > 0) {
      header.classList.add('active')
   }
   else if (window.pageYOffset === 0) {
      header.classList.remove('active');
   }
}



const animItems = document.querySelectorAll('.anim-items')

window.addEventListener('scroll', checkItems)

checkItems()

function checkItems() {
   const triggerBottom = window.innerHeight / 5 * 4;

   animItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top

      if (itemTop < triggerBottom) {
         item.classList.add('active')
      } else if (!item.classList.contains('anim-no-hide')) {
         item.classList.remove('active')
      }
   })
}


const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(smoothLink => {
   smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');
      const targetSection = document.querySelector(id);

      window.scrollBy({
         top: targetSection.offsetTop,
         behavior: 'smooth'
      });
   });
})




const paralaxBtns = document.querySelectorAll(".welcome__btn");

paralaxBtns.forEach(btn => {
   btn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = btn.firstElementChild.getAttribute('href');
      const targetSection = document.querySelector(id);

      window.scrollBy({
         top: targetSection.offsetTop,
         behavior: 'smooth'
      });
   });
})


let position = 0;
const slidesToShow = 2;
const slidesToScroll = 1;
const slider = document.getElementById('news__slider');
const track = document.getElementById('news__track');
const btnPrev = document.getElementById('news__btn--left');
const btnNext = document.getElementById('news__btn--right');
const items2 = slider.getElementsByClassName('news__item');
const itemsCount = items2.length;
const itemWidth = slider.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

for (let item of items2) {
   item.style.minWidth = `${itemWidth}px`;
}

function showNextSlides() {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   setPosition();
   checkBtns();
}

function showPrevSlides() {
   const itemsLeft = Math.abs(position) / itemWidth;

   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

   setPosition();
   checkBtns();
}

function setPosition() {
   track.style.transform = `translateX(${position}px)`;
   console.log(track.style.transform)
}

function checkBtns() {
   btnPrev.disabled = position === 0;
   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

btnNext.addEventListener('click', showNextSlides);
btnPrev.addEventListener('click', showPrevSlides);


const email = document.getElementById("email");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});


checkBtns();