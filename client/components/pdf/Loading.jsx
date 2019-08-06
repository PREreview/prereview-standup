import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@pubsweet/ui'

const LoadingDiv = styled.div`
  height: 100%;
  width: 100%;
  margin: 25% auto;
`
const Loading = () => (
  <LoadingDiv>
    <Spinner size={6} />
  </LoadingDiv>
)

export default Loading
