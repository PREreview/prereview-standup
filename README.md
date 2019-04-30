# `prereview2-demo`

PREreview2 demo for development, user testing etc.

Should usually be found running live at http://beta.prereview.org

## Commands

Command                | Description                                      |
-----------------------|--------------------------------------------------|
`$ npm start`          | Start the development server

## Environment variables

Some environment variables are required for the app to run:

- `ORCID_CLIENT_ID`
- `ORCID_CLIENT_SECRET`

If you place them in a `.env` file in top-level directory will be auto-loaded, e.g.:

**.env**

```
ORCID_CLIENT_ID=APP-AAAAAAAAAAAAAAAA
ORCID_CLIENT_SECRET=11111111-aaaa-1111-aaaa-111111111111
```
