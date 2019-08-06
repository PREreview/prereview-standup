import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Icon, Action } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import * as PDFJS from 'pdfjs-dist/webpack.js'
import Viewer from './Viewer'

const Limit = createGlobalStyle`
  body {
    overflow: hidden;
    div {
      position: relative !important;
    }
  }
`
const OuterContainer = styled.div`
  max-width: 100%;
  background-color: ${th('colorBackgroundHue')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  position: relative;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  &.full {
    position: fixed !important;
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    height: 100vh;
  }
`
const Toolbar = styled.div`
  background-color: ${th('colorBackgroundHue')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(${th('gridUnit')} * 6);
  padding: ${th('gridUnit')};
  box-sizing: border-box;
`
const Zoom = styled(Action)`
  display: inline-flex;
  align-items: center;
  @media screen and (max-width: 450px) {
    .hide-mobile {
      display: none;
    }
  }
  .rotate svg {
    transform: rotate(45deg);
  }
`
const Info = styled.span`
  display: inline-block;
  vertical-align: top;
  margin: 0 ${th('gridUnit')};
`
class PDFViewer extends React.Component {
  state = {
    pdf: null,
    text: [],
    page: 1,
    scale: 0,
    fullscreen: false,
    loading: true,
  }
  async componentDidMount() {
    const pdf = await PDFJS.getDocument(this.props.url)
    if (this.viewer) {
      this.setState({ pdf, loading: false })
    }
  }
  zoomIn = () => {
    const { scale } = this.state
    const rounded = Math.round(scale * 4) / 4
    if (rounded < 5) {
      if (rounded >= 2) {
        this.setState({ scale: rounded + 1 })
      } else {
        this.setState({ scale: rounded + 0.25 })
      }
    }
  }
  zoomOut = () => {
    const { scale } = this.state
    const rounded = Math.round(scale * 4) / 4
    if (rounded > 0.5) {
      if (rounded >= 3) {
        this.setState({ scale: rounded - 1 })
      } else {
        this.setState({ scale: rounded - 0.25 })
      }
    }
  }
  setFit = fit => {
    if (this.viewer && fit) this.setState({ scale: fit })
  }
  setRef = viewer => {
    this.viewer = viewer
  }
  countPages = () => {
    const { top } = this.viewer.getBoundingClientRect()
    const pages = this.viewer.getElementsByClassName('pdf-page')
    const topPages = Array.prototype.filter.call(
      pages,
      page => page.getBoundingClientRect().top <= top,
    )
    if (topPages.length > 0) {
      const page = topPages[topPages.length - 1].dataset.pageNumber
      if (this.state.page !== page) {
        this.setState({ page })
      }
    }
  }
  deliverText = pageText => {
    if (this.viewer && (this.props.textContent || this.props.loaded)) {
      this.setState({ text: [...this.state.text, pageText] }, () => {
        const { text, pdf } = this.state
        if (text.length === pdf._pdfInfo.numPages || text.length === 51) {
          const sorted = text.sort((a, b) => a.page - b.page)
          if (this.props.textContent) {
            this.props.textContent(sorted.map(p => p.text).join(' '))
          }
          if (this.props.loaded) {
            this.props.loaded(true)
          }
        }
      })
    }
  }
  render() {
    const { pdf, scale, page, fullscreen, loading } = this.state
    return (
      <React.Fragment>
        {fullscreen && <Limit />}
        <OuterContainer
          className={`pdf-viewer ${fullscreen && 'full'}`}
          data-pages={pdf && pdf._pdfInfo && pdf._pdfInfo.numPages}
          ref={this.setRef}
        >
          <Toolbar>
            {pdf && pdf._pdfInfo && (
              <Info>
                Page {page} of {pdf._pdfInfo.numPages}
              </Info>
            )}
            <div>
              <Zoom onClick={this.zoomOut} title="Zoom out">
                <Icon color="currentColor" size={2.75}>
                  zoom-out
                </Icon>
              </Zoom>
              <Zoom onClick={this.zoomIn} title="Zoom in">
                <Icon color="currentColor" size={2.75}>
                  zoom-in
                </Icon>
              </Zoom>
            </div>
            <div>
              <Zoom
                onClick={() => this.setState({ scale: 0 })}
                style={{ padding: '0 4px', marginRight: '4px' }}
              >
                <Icon className="rotate" color="currentColor" size={2.3}>
                  maximize-2
                </Icon>
                <span className="hide-mobile">Fit to width</span>
              </Zoom>
              <Zoom
                onClick={() => this.setState({ fullscreen: !fullscreen })}
                style={{ padding: '0 4px' }}
              >
                <Icon color="currentColor" size={2.3}>
                  {fullscreen ? 'minimize' : 'maximize'}
                </Icon>
                <span className="hide-mobile">
                  {fullscreen ? 'Exit full screen' : 'Full screen'}
                </span>
              </Zoom>
            </div>
          </Toolbar>
          {pdf && (
            <Viewer
              fitWidth={this.setFit}
              loading={loading}
              onScroll={this.countPages}
              pdf={pdf}
              scale={scale}
              textContent={this.deliverText}
            />
          )}
        </OuterContainer>
      </React.Fragment>
    )
  }
}

export default PDFViewer
