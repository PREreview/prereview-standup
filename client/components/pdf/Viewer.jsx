import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import Page from './Page'
import Loading from './Loading'

const Pane = styled.div`
  text-align: center;
  max-width: 100%;
  box-sizing: border-box;
  height: calc(100vh - (${th('gridUnit')} * 6));
  overflow: auto;
`

class Viewer extends React.PureComponent {
  render() {
    const { pdf, loading, ...props } = this.props
    const numPages = pdf && pdf._pdfInfo ? pdf._pdfInfo.numPages : 0
    return (
      <Pane className="pdf-viewer-pane" onScroll={props.onScroll}>
        {loading && <Loading />}
        {props.scale === 0 ? (
          <Page
            index={1}
            key={`document-page-${Math.round(Math.random() * 1e12).toString(
              36,
            )}`}
            pdf={pdf}
            {...props}
          />
        ) : (
          <React.Fragment>
            {numPages < 51 ? (
              [...Array(numPages)].map((v, i) => (
                <Page
                  index={i + 1}
                  key={`document-page-${Math.round(
                    Math.random() * 1e12,
                  ).toString(36)}`}
                  pdf={pdf}
                  {...props}
                />
              ))
            ) : (
              <React.Fragment>
                {[...Array(51)].map((v, i) => (
                  <Page
                    index={i + 1}
                    key={`document-page-${Math.round(
                      Math.random() * 1e12,
                    ).toString(36)}`}
                    pdf={pdf}
                    {...props}
                  />
                ))}
                <p>
                  <br />
                  Your file is very large. More pages cannot be loaded for
                  preview without slowing site operations.
                  <br />
                  <br />
                </p>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Pane>
    )
  }
}

export default Viewer
