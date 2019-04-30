var Component = require('choo/component')
var html = require('choo/html')
var stylise = require('../../lib/stylise')

var css = require('sheetify')

var baseStyle = css`

:host {
  border-top: 1px solid #ddd;
  background: white;
  padding: 0 20px;
  padding-bottom: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  -webkit-transition: height 0.5s; 
  -moz-transition: height 0.5s; 
  -ms-transition: height 0.5s; 
  -o-transition: height 0.5s; 
  transition: height 0.5s;  
}


`

module.exports = class Popover extends Component {
  constructor(id, state, emit, opts) {
    super(id, state, emit, opts)
    this.opts = Object.assign({
      classes: [baseStyle],
      style: {
        height: 0
      },
      content: null
    }, opts)
  }

  createElement () {
    return html`
    
    <div class="popover ${this.opts.classes.join(' ')}" style="${stylise(this.opts.style)}">
      ${this.opts.content}
    </div>
    
    `
  }

  update () {
    return this.element ? false : true
  }

  show (opts) {
    Object.assign(this.opts, opts)
    this.opts.style.display = 'block'
    this.opts.style.height = 'auto !important'
    if (this.element) this.rerender()
  }

  hide () {
    // TODO: make this less messy
    this.opts.style.display = 'none'
    this.opts.style.height = 0
    if (this.element) this.rerender()
  }
}
