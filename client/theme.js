var css = require('sheetify')

css`

* {
  font-family: 'Open Sans', sans-serif;
  --theme-red: #ff3333;
  --theme-black: ##00000;
  --theme-white: #ffffff;
  --theme-gray: #4b4949;
}

a {
  outline: 0;
}

.red {
  color: var(--theme-red);
}

.bg-red {
  background-color: var(--theme-red);
}

.gray {
  color: var(--theme-gray);
}

.bg-gray {
  background-color: var(--theme-gray);
}

h1 {
  font-size: 24pt;
  font-weight: 600;
}

h2 {
  font-size: 18pt;
  font-weight: 300;
}

h3 {
  font-size: 14pt;
  font-weight: 700;
}

h4 {
  font-size: 10pt;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--theme-red);
}

p {
  font-size: 10pt;
}

`