window.customElements.define('css-slideshow', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML=`
    <style>
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
        bottom: 8px;
        width: 100%;
        text-align: center;
      }
      
      /* Number text (1/3 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }
      
      /* The dots/bullets/indicators */
      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }
      
      .active, .dot:hover {
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
    <div class="slideshow-container">
    ${/*
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img src="https://clansstewart.org/pics/Appin1.gif">
      <div class="text">Caption Text</div>
    </div>
    
    <div class="mySlides fade">
      <div class="numbertext">2 / 3</div>
      <img src="https://clansstewart.org/pics/Atholl1.gif">
      <div class="text">Caption Two</div>
    </div>
    
    <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img src="https://clansstewart.org/pics/Bute1.gif">
      <div class="text">Caption Three</div>
    </div>

    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    */
    ''}
    
    </div>
    <br>
    
    <div style="text-align:center">
      <span class="dot"></span> 
      <span class="dot"></span> 
      <span class="dot"></span> 
    </div>
    `;

    let slides = this.querySelectorAll('img');
    let divSlides = [...slides].map(e=>
      `<div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img src="${e.src}">
        <div class="text">Caption Text</div>
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
      if(e.target.classList.contains('dot')) currentSlide(Array.from(e.target.parentNode.children).indexOf(e.target)+1)
    });
    
    function showSlides(n) {
      var i;
      var slides = shadow.querySelectorAll(".mySlides");
      var dots = shadow.querySelectorAll(".dot");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }
  }
});
