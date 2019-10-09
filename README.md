![PREreview logo](https://github.com/PREreview/prereview-standup/raw/master/assets/logo.png)

<p align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- License -->
  <a href="https://github.com/PREreview/PRereview-2/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square"
      alt="MIT license" />
  </a>
  <!-- Made with <3 -->
  <a href="https://prereview.org" target="_blank">
    <img src="https://img.shields.io/badge/made_with-❤️💛💚💙💜-e6e6e6.svg?style=flat-square" />
  </a>
</p>

**NOTE: this project is under very active development and is not currently accepting contributions.** Thanks for taking an interest 😊. Feel free to star/watch the repo and we'll remove this notice once we have processes and documentation in place to allow people to collaborate productively.

**[Join our PREreview Slack Channel](https://join.slack.com/t/prereview/shared_invite/enQtMzYwMjQzMTk3ODMxLTZhOWQ5M2FmMTY5OTYzZDNhNDg2ZDdhODE2Y2Y4MTVjY2U0OWRiZTA5ZjM3MWM1ZTY0N2E1ODYyNWM1NTc2NDg)**

## Developing

PREreview is composed of a server and client. The client is a [choo](https://github.com/choojs/choo) app written in NodeJS and compiled for the browser using [bankai](https://github.com/choojs/bankai). The server is an [express](https://github.com/choojs/bankai) app written in NodeJS. The database is PostgreSQL v11.

### Requirements

- NodeJS v12+

### Installing

```bash
# install documentation
git clone https://github.com/PREreview/documentation.git
cd documentation && npm i
# install getpreprints
git clone https://github.com/PREreview/getpreprints.git
cd documentation && npm i
# install PREreview
git clone https://github.com/PREreview/prereview-standup.git
cd prereview-standup/client
npm i # install client app dependencies
cd ..
npm i # install server app dependencies
```

### Running the platform

Running in developer mode provides a live-reloading client and server as well as various tools to inspect and debug the app in node and the browser.

To run the app:

```bash
npm run dev
```
