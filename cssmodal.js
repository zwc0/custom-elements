window.customElements.define('css-modal', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML=`
    <style>
      :host {
        ${this.hasAttribute('center')?'text-align:center;':''}
        --bg-color: ${this.getAttribute('color') || '#5cb85c'}
      }
      ${self.getAttribute('background') == 'none' ? '' : `
      .holder {
        display: block;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
      }
      `}
      .modal-content {
        display: block;
        z-index: 1;
        position: absolute;
        background-color: #fefefe;
        margin: auto;
        top: ${this.getAttribute('top')||'25px'};
        width: ${this.getAttribute('width')||'80%'};
        left: 10%;
      }
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
    <div class="holder" ${self.getAttribute('background') == 'close' ?'data-modal="close"':''}>
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

    dragElement(shadow.querySelector('.modal-content'));
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (shadow.querySelector(".modal-header")) {
        elmnt.querySelector(".modal-header").onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }

      self.close();
    }
  }
  close() {this.style.display = 'none'}
  show() {this.style.display = ''}
});