import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import {
  DefaultAnnotationLayerFactory,
  DefaultTextLayerFactory,
  PDFPageView,
} from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import Loading from './Loading'

const PDFPage = styled.div`
  margin: 0 auto;
  .page {
    margin 0 auto;
    position: relative;
    & > * {
      position: absolute !important;
      top: 0;
      left: 0;
    }
    .textLayer > div {
      position: absolute !important;
    }
  }
  & + div {
    margin-top: calc(${th('gridUnit')} * 2);
  }
`
class Page extends React.Component {
  state = {
    status: 'N/A',
    page: null,
  }
  componentDidMount() {
    const { pdf } = this.props
    if (pdf) {
      this.update(pdf)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status
    )
  }
  componentDidUpdate(nextProps) {
    this.update(nextProps.pdf)
  }
  setPageRef = page => {
    this.page = page
  }
  update = pdf => {
    if (pdf) {
      this.loadPage(pdf)
    }
  }
  async loadPage(pdf) {
    if (this.state.status === 'rendering' || this.state.page !== null) return
    const pdfPage = await pdf.getPage(this.props.index)
    if (this.page) {
      this.setState({ status: 'rendering' })
    }
    this.renderPage(pdfPage)
    const content = await pdfPage.getTextContent()
    this.props.textContent({
      page: this.props.index,
      text: content.items.map(item => item.str).join(''),
    })
  }
  renderPage(pdfPage) {
    const { page } = this
    const { index, scale } = this.props
    const CSS_UNITS = 96 / 72
    if (page) {
      if (scale === 0 && index === 1) {
        const unscaledViewport = pdfPage.getViewport(1.0)
        const newScale =
          (page.parentElement.clientWidth - 10) /
          (unscaledViewport.width * CSS_UNITS)
        this.props.fitWidth(newScale.toFixed(2))
      } else {
        const viewport = pdfPage.getViewport(scale)
        const pdfPageView = new PDFPageView({
          container: page,
          id: index,
          scale,
          defaultViewport: viewport,
          textLayerFactory: new DefaultTextLayerFactory(),
          annotationLayerFactory: new DefaultAnnotationLayerFactory(),
        })
        pdfPageView.setPdfPage(pdfPage)
        this.setState({ status: 'rendered', page: pdfPage })
        return pdfPageView.draw()
      }
    }
  }
  render() {
    return (
      <PDFPage
        className={`pdf-page ${this.state.status}`}
        data-page-number={this.props.index}
        ref={this.setPageRef}
      >
        {this.props.index === 1 && this.state.status !== 'rendered' && (
          <Loading />
        )}
      </PDFPage>
    )
  }
}

export default Page
