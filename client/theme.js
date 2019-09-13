var css = require('sheetify')

css`

* {
  font-family: 'Open Sans', sans-serif;
  --theme-red: #ff3333;
  --theme-black: ##00000;
  --theme-white: #ffffff;
  --theme-gray: #4b4949;
  outline: 0;
  -moz-outline-style: none;
}

a {
  outline: 0;
  color: var(--theme-red);
  text-decoration: none;
}

a:active, a:focus {
  outline: 0;
  border: none;
  -moz-outline-style: none;
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
  font-size: 13pt;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--theme-red);
}

p {
  font-size: 12pt;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

`