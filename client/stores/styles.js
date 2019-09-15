module.exports = styles

var css = require('sheetify')

var main = css`

:host {
  background: #a9e4f7;
}

`

var section = css`

:host {
  background: -moz-linear-gradient(top, rgba(255,255,255,0.7) 0%, rgba(246,246,246,0.7) 44%, rgba(237,237,237,0.7) 100%);
}

`

function styles (state, emitter) {
  var opts = state.styleOpts = {
    primary: 'red',
    secondary: 'dark-gray'
  }

  state.style = {
    styles: {},
    classes: {}
  }

  const updateStyles = () => {
    state.style = {
      classes: {
        col: `flex flex-column`,
        row: `flex flex-row`,
        center: `justify-center items-center content-center v-mid`,
        main: `${main}`,
        input: `border-box bg-white ba1 pa2 h3 f4 dark-gray`,
        section: `flex flex-column mv2 pa4 br0 bbgray hover-mid-gray ${section}`,
        title: `roboto fw4 f4 tl mv1`,
        footer: `flex h4 w-100 absolute bottom-0 bg-${opts.primary}`,
        tab: `w-third pa3 h-100 tc white b f2 link dim`,
        icon: `white`,
        label: `f4 tc normal mt1`,
        button: `flex flex-row justify-center content-center br3 b items-center v-mid bn mt2 ph4 pv3 nowrap dim dt bg-red link white dtc v-mid pointer`,
        navbutton: `border-box dib bn pa1 white bg-${opts.primary} link dim`,
        secondary: `bg-${opts.secondary} dark-gray`,
        secondaryButton: `flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-${opts.secondary} white link dim outline-0 br3 pointer`
      }
    }
  }

  updateStyles()
}
