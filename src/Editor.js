import React, { Component } from 'react';

import {UnControlled as CodeMirror} from 'react-codemirror2'

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: (this.props.show === "true"),
      code: this.props.value,
      theme: this.props.theme
    }
  }

  componentDidMount() {
    this.updateTheme(localStorage.getItem('theme_' + this.props.languageAlias) || this.props.theme);
    this.updateCode(localStorage.getItem('code_' + this.props.languageAlias) || this.props.value);
  }

  toggle() {
    this.setState({
      show: ! this.state.show
    })
  }

  getCode() {
    var code = this.state.code;
    if (code.length === 0 && this.props.default)
      code = this.props.default;
    return code;
  }

  updateCode(code) {
    this.setState({
      code: code
    });
  }

  updateTheme(v) {
    localStorage.setItem('theme_' + this.props.languageAlias, v);
    if (v) {
      this.setState({
        theme: v
      });
    }
  }

  render() {
    return(
      <CodeMirror
        ref='CodeMirror'
        value={this.state.code}
        className={ this.state.show ? 'editor_' + this.props.language : 'hide' }
        options={{
          mode: this.props.language,
          theme: this.state.theme,
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
        }}
        onChange={(editor, data, value) => {
          this.setState({
            code: value
          });
          localStorage.setItem('code_' + this.props.languageAlias, value);
        }}
      />
    );
  }
}