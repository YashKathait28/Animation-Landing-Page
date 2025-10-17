// Animate feature cards on scroll
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0) rotateY(0deg)';
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvas.width) this.x = 0;
    if(this.x < 0) this.x = canvas.width;
    if(this.y > canvas.height) this.y = 0;
    if(this.y < 0) this.y = canvas.height;
  }
  draw(){
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}
function initParticles(){
  particlesArray = [];
  for(let i=0;i<150;i++){
    particlesArray.push(new Particle());
  }
}
initParticles();
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  document.querySelector('.hero-shape').style.transform = `translateX(-50%) translateY(${scroll * 0.2}px)`;
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let index = 0;
setInterval(() => {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[index].classList.add('active');
  index = (index + 1) % testimonials.length;
}, 4000);
