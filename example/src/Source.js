import React, { Component } from 'react';
import axios from 'axios'
import SyntaxHighlighter from "react-syntax-highlighter"
import { githubGist } from 'react-syntax-highlighter/dist/styles';

const req = axios.create()
const loadSource = (url) => {
  return req.get(url, {responseType: 'text'})
    .then(({data}) => {
      return data
    })
}

export default class extends Component{
  state = {}
  componentWillMount(){
    const { url } = this.props
    loadSource(url)
      .then(source => {
        this.setState({
          source: source
        })
      })
  }
  render(){
    const { source } = this.state
    if(!source){
      return null
    }
    const customStyle = {
      padding: 0,
      margin: 0,
      background: "transparent"
    }
    return <SyntaxHighlighter customStyle={customStyle} language='javascript' style={githubGist}>
      {source}
    </SyntaxHighlighter>
  }
}
