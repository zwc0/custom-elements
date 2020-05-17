window.customElements.define('css-modal', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML=`
    <style>
      /* The Modal (background) */
      :host {
        display: none; /* Hidden by default */
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
        position: relative;
        background-color: #fefefe;
        margin: auto;
        width: ${this.getAttribute('width')||'80%'};
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
    <div class="modal-content">
      ${this.getAttribute('title')!='none'
      ?`
      <div class="modal-header">
        <slot name="header">
          <span class="close">&times;</span>
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
    `;
    shadow.querySelector('.close').addEventListener('click',e=>self.close());
    this.addEventListener('click',e=>{
      if(e.target.dataset.modal == 'close') self.close();
    });
  }
  close() {this.style.display = 'none'}
  show() {this.style.display = 'block'}
});