window.customElements.define('css-grid', class extends HTMLElement {
  constructor(){
    super();
    const self = this;
    const shadow = this.attachShadow({mode: 'open'});
    // set row and col
    let rowcol = e => {
      if(e != 'auto-flow'){
        e = Number(e)
        ? `repeat(${e},1fr)`
        : e;
      }
      return e;
    };
    // set row
    let row = this.getAttribute('row') || 'auto-flow';
    // set col
    let col = this.getAttribute('col') || 'auto-flow';
    // define alternative sizes
    let grid = e => {
      if(self.hasAttribute(e)){
        let a = self.getAttribute(e);
        e = e.split('-')[0];
        a = Number(a)
        ? `repeat(${a},1fr)`
        : a;
        return `--${e}:${a};`;
      }else{ return ''; }
    };
    shadow.innerHTML=`
    <style>
    /*default*/
    :host {
      --row: ${rowcol(row)};
      --col: ${rowcol(col)};
    }
    /*medium*/
    @media only screen and (max-width: 800px) {
      :host {
        ${grid('col-m')}
        ${grid('row-m')}
      }
    }
    /*small*/
    @media only screen and (max-width: 600px) {
      :host {
        ${grid('col-s')}
        ${grid('row-s')}
      }
    }
    :host {
      display: grid;
      grid: var(--row) / var(--col);
      grid-gap: ${this.getAttribute('gap')||'0 0'};
      ${this.hasAttribute('center')?'text-align: center;':''}
    }
    </style>
    <slot></slot>
    `;
  }
});