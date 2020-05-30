window.customElements.define('css-slideshow', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    const imgs = this.querySelectorAll('img');

    let prop = (()=>{
      if(self.getAttribute('prop') == 'thumbnail') return `
      <div id="dots" style="display: grid; grid: auto / repeat(${imgs.length}, 1fr)">${this.innerHTML}</div>`;
      return `
      <div id="dots" style="text-align:center">${`<span></span>`.repeat(imgs.length)}</div>`;
    })();

    shadow.innerHTML=`
    <style>
    :host {display: block}
      * {box-sizing: border-box}
      body {font-family: Verdana, sans-serif; margin:0}
      .mySlides {display: none}
      img {vertical-align: middle; width: 100%;}
      
      /* Slideshow container */
      .slideshow-container {
        max-width: 400px;
        position: relative;
        margin: auto;
      }
      
      /* Next & previous buttons */
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }
      
      /* Position the "next button" to the right */
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }
      
      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }
      
      /* Caption text */
      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
        ${self.getAttribute('caption') == 'solid' ? `background-color: black;` : ''}
      }
      
      /* Number text (1/3 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }
      ${self.hasAttribute('prop') ? '' : `
      #dots {
        display: none;
      }
      `}
      #dots>span {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }
      #dots>img {
        cursor: pointer;
        opacity: 0.6;
      }
      #dots>.active, #dots>img.demo:hover {
        opacity: 1;
      }
      #dots>.active, #dots>span:hover {
        background-color: #717171;
      }
      
      /* Fading animation */
      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }
      
      @-webkit-keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }
      
      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }
      
      /* On smaller screens, decrease text size */
      @media only screen and (max-width: 300px) {
        .prev, .next,.text {font-size: 11px}
      }
    </style>
    <div class="slideshow-container"></div>
    ${prop}
    `;

    let divSlides = [...imgs].map((e,i)=>
      `<div class="mySlides fade">
        ${self.getAttribute('count') == 'no' ? '' : 
        `<div class="numbertext">${i + 1} / ${imgs.length}</div>`
        }
        <img src="${e.src}">
        <div class="text">${e.alt || ''}</div>
      </div>`
    ).join('');
    divSlides += `
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    `;
    shadow.querySelector('.slideshow-container').innerHTML = divSlides;

    var slideIndex = 1;
    showSlides(slideIndex);
    
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    shadow.addEventListener('click',e=>{
      if(e.target.classList.contains('prev')) plusSlides(-1);
      if(e.target.classList.contains('next')) plusSlides(1);
      if(e.target.parentElement.id == ('dots')) currentSlide(Array.from(e.target.parentNode.children).indexOf(e.target)+1)
    });
    
    function showSlides(n) {
      const slides = shadow.querySelectorAll(".mySlides"),
      dots = shadow.querySelector("#dots").children;
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      slides.forEach(e=>e.style.display = 'none');
      [...dots].forEach(e=>e.classList.remove('active'));
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += "active";
    }

    if(self.hasAttribute('auto')){
      setInterval(()=>plusSlides(1), self.getAttribute('auto'))
    }

    (()=>{
      let xStart = 0, xEnd = 0, yStart = 0, yEnd = 0;
      function onStart(e) {
        xStart = e.touches[0].clientX;
        yStart = e.touches[0].clientY;
      }
      function onMove(e) {
        //e.preventDefault();
        xEnd = e.touches[0].clientX;
        yEnd = e.touches[0].clientY;
      }
      function onEnd(e) {
        if(!xEnd) return;
        const xdiff = Math.abs(xStart - xEnd);
        const ydiff = Math.abs(yStart - yEnd);
        if(ydiff > xdiff) return;
        xStart > xEnd ? plusSlides(1) : plusSlides(-1);
        xEnd = 0;
      }
      self.addEventListener('touchstart', onStart);
      self.addEventListener('touchmove', onMove);
      self.addEventListener('touchend', onEnd);
    })()

  }
  //move functions to public
  //auto(freq){}
});