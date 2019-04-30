var html = require('choo/html')
const Chartist = require('chartist')

const sf = require('sheetify')
sf('chartist', {
  global: true
})

var defaultdata = {
  labels: ['Lake Trout', 'Atlantic Salmon'],
  series: [
    [8, 12],
    [4, 7]
  ]
}

var defaultoptions = {
  seriesBarDistance: 10,
  reverseData: true,
  horizontalBars: true,
  fullWidth: true,
  onlyInteger: true,
  showGrid: false,
  axisY: {
    offset: 70
  }
}

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
]

module.exports = function chart(state, emit, opts) {
  var el = html`<div></div>`
  var plot = new Chartist['Bar'](el, defaultdata, defaultoptions, responsiveOptions)
  return el
}