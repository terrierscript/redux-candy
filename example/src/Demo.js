import React, { Component } from 'react';
import Source from './Source'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100vw;
`
const Child = styled.div`
  flex: 1;
  width: 40vw; /* TODO */
  border-radius: 2px;
  border: solid #ccc 1px;
  margin: 1em;
  padding: 1em;
`

export default ({sourceUrl, children}) => {
  return <Flex>
    <Child>
      {children}
    </Child>
    <Child>
      <Source url={sourceUrl} />
    </Child>
  </Flex>
}