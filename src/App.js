import React, { Component } from 'react';
import './App.css';

import fileDownload from 'js-file-download';
import Editor from './Editor';
import Options from './Options';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'page',
      visible: {
        options: false
      },
      srcdoc: "",
      editors: {
        xml:  null,
        css:  null,
        js:   null,
        json: null
      }
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentDidMount() {
    var t = this;
    setTimeout(() => { t.renderHTML() }, 3000);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  toggleOptions() {
    var visible = {...this.state.visible};
    visible.options = !visible.options;
    this.setState({visible});
  }

  toggleEditor(name) {
    this.state.editors[`${name}`].toggle();
  }

  saveHTML()
  {
    this.renderHTML();
    fileDownload(this.state.srcdoc, `${this.state.title}.html`);
  }

  renderHTML() {
    this.setState({ srcdoc: `
      <html>
      <head>
        <title>${this.state.title}</title>
        <style>${this.state.editors['css'].getCode()}</style>
      </head>
      <body>
        ${this.state.editors['xml'].getCode()}
        <script>var jsonData=${this.state.editors['json'].getCode()}</script>
        <script>${this.state.editors['js'].getCode()}</script>
      </body>
      </html>`
    });
  }

  render() {
    return (
      <div id="app">
        <div id="editors">
          <Editor
            ref={(editor) => this.state.editors['xml'] = editor }
            language="xml"
            languageAlias="html"
            show="true"
            theme="material"
            value='<h1>Hello</h1><h2 id="h2"></h2>'
          />
          <Editor
            ref={(editor) => this.state.editors['css'] = editor }
            language="css"
            languageAlias="css"
            show="true"
            theme="monokai"
            value='body { background-color: #333; color: #eee; }'
          />
          <Editor
            ref={(editor) => this.state.editors['js'] = editor }
            language="javascript"
            languageAlias="js"
            show="true"
            theme="colorforth"
            value='document.getElementById("h2").innerText = jsonData["hello"];'
          />
        </div>
        <div id="right">
          <div id="controls" className="panel">
            <input type="text" placeholder="title" value={this.state.title} onChange={this.handleChangeTitle} />
            <br />
            <button onClick={() => this.toggleOptions() }>Options</button>
            <button onClick={() => this.renderHTML() }>Preview</button>
            <button onClick={() => this.saveHTML() }>Save</button>
            <button onClick={() => this.toggleEditor('xml') }>html</button>
            <button onClick={() => this.toggleEditor('css') }>css</button>
            <button onClick={() => this.toggleEditor('js') }>js</button>
            <button onClick={() => this.toggleEditor('json') }>json</button>
          </div>
          <div id="options" className={this.state.visible.options ? 'panel' : 'hide'}>
            <Options language="html" onUpdateTheme={(v) => this.state.editors['xml'].updateTheme(v)} />
            <Options language="css"  onUpdateTheme={(v) => this.state.editors['css'].updateTheme(v)} />
            <Options language="js"   onUpdateTheme={(v) => this.state.editors['js'].updateTheme(v)} />
            <Options language="json" onUpdateTheme={(v) => this.state.editors['json'].updateTheme(v)} />
          </div>
          <iframe title="preview" className="panel" srcDoc={this.state.srcdoc}></iframe>
          <Editor
            ref={(editor) => this.state.editors['json'] = editor }
            language="javascript"
            languageAlias="json"
            show="true"
            theme="dracula"
            default="{}"
            value='{ "hello": "world" }'
          />
        </div>
      </div>
    );
  }
}

export default App;
