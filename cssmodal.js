window.customElements.define('css-modal', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML=`
    <style>
      /* The Modal (background) */
      .holder {
        display: block; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: ${this.getAttribute('top')||'25px'}; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: calc(100% - ${this.getAttribute('top')||'25px'}); /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        ${this.hasAttribute('center')?'text-align:center;':''}
        --bg-color: ${this.getAttribute('color') || '#5cb85c'}
      }
      /* Modal Content */
      .modal-content {
        z-index: 1;
        position: absolute;
        background-color: #fefefe;
        margin: auto;
        width: ${this.getAttribute('width')||'80%'};
        left: 10%;
      }
      /* The Close Button */
      .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      .modal-header, .modal-footer {
        padding: 2px 16px;
        background-color: var(--bg-color);
        color: white;
      }
      .modal-body {padding: 2px 16px;}
    </style>
    <div class="holder" ${self.hasAttribute('bgclose')?'data-modal="close"':''}>
    <div class="modal-content">
      ${this.getAttribute('title')!='none'
      ?`
      <div class="modal-header">
        <slot name="header">
          <span class="close" data-modal="close">&times;</span>
          <h2>${self.getAttribute('title')||''}</h2>
        </slot>
      </div>
      `:''}
      <div class="modal-body">
        <slot></slot>
      </div>
      ${this.getAttribute('footer')!='none'
      ?`
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
      `:''}
    </div>
    </div>
    `;
    shadow.addEventListener('click',e=>{
      if(e.target.dataset.modal == 'close'){self.close()}
    });

    //Make the DIV element draggagle:
    dragElement(shadow.querySelector('.modal-content'));
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (shadow.querySelector(".modal-header")) {
        /* if present, the header is where you move the DIV from:*/
        elmnt.querySelector(".modal-header").onmousedown = dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        self.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        self.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        self.onmouseup = null;
        self.onmousemove = null;
      }

      self.close();
    }
  }
  close() {this.style.display = 'none'}
  show() {this.style.display = ''}
});