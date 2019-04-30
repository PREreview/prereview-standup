module.exports = {
  phoneify: require('./phoneui/phoneify'),
  section: require('./phoneui/section'),
  navigation: require('./phoneui/navigation'),
  navbutton: require('./phoneui/navbutton'),
  tab: require('./phoneui/tab'),
  footer: require('./phoneui/footer'),
  statusbar: require('./phoneui/statusbar'),
  button: require('./button'),
  chart: require('./chart'),
  form: {
    input: require('./form/input'),
    choose: require('./form/choose'),
    question: require('./form/question')
  },
  setup: require('./startup/setup'),
  Map: require('./catch/lakemap/map'),
  Fishpicker: require('./catch/fishpicker/fishpicker'),
  Stack: require('./stack'),
  Stackable: require('./stack/stackable'),
  startup: require('./startup'),
  size: require('./catch/size')
}