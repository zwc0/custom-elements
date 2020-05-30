import dragElement from './drag.js';
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

    if(self.hasAttribute('drag')){
      const handle = self.getAttribute('drag') ? shadow.querySelector(self.getAttribute('drag')) : shadow.querySelector('.modal-header');
      dragElement(shadow.querySelector('.modal-content'), handle);
    }

    self.close();
  }
  close() {this.style.display = 'none'}
  show() {this.style.display = ''}
});