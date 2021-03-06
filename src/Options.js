import React, { Component } from 'react';

export default class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: localStorage.getItem('theme_' + this.props.language) || 'default'
    };
    this.handleUpdateTheme = this.handleUpdateTheme.bind(this);
  }

  handleUpdateTheme(event) {
    var theme = event.target.value;

    this.setState({
      theme: theme
    });
    this.props.onUpdateTheme(theme);
    console.log('theme_' + this.props.language);
    localStorage.setItem('theme_' + this.props.language, theme);
  }

  render() {
    return(
      <div>
        <label>{this.props.language}</label>
        <select onChange={this.handleUpdateTheme} defaultValue={this.state.theme || 'default'}>
          <option value="default">default</option>
          <option value="3024-day">3024-day</option>
          <option value="3024-night">3024-night</option>
          <option value="abcdef">abcdef</option>
          <option value="ambiance">ambiance</option>
          <option value="base16-dark">base16-dark</option>
          <option value="base16-light">base16-light</option>
          <option value="bespin">bespin</option>
          <option value="blackboard">blackboard</option>
          <option value="cobalt">cobalt</option>
          <option value="colorforth">colorforth</option>
          <option value="darcula">darcula</option>
          <option value="dracula">dracula</option>
          <option value="duotone-dark">duotone-dark</option>
          <option value="duotone-light">duotone-light</option>
          <option value="eclipse">eclipse</option>
          <option value="elegant">elegant</option>
          <option value="erlang-dark">erlang-dark</option>
          <option value="gruvbox-dark">gruvbox-dark</option>
          <option value="hopscotch">hopscotch</option>
          <option value="icecoder">icecoder</option>
          <option value="idea">idea</option>
          <option value="isotope">isotope</option>
          <option value="lesser-dark">lesser-dark</option>
          <option value="liquibyte">liquibyte</option>
          <option value="lucario">lucario</option>
          <option value="material">material</option>
          <option value="mbo">mbo</option>
          <option value="mdn-like">mdn-like</option>
          <option value="midnight">midnight</option>
          <option value="monokai">monokai</option>
          <option value="neat">neat</option>
          <option value="neo">neo</option>
          <option value="night">night</option>
          <option value="nord">nord</option>
          <option value="oceanic-next">oceanic-next</option>
          <option value="panda-syntax">panda-syntax</option>
          <option value="paraiso-dark">paraiso-dark</option>
          <option value="paraiso-light">paraiso-light</option>
          <option value="pastel-on-dark">pastel-on-dark</option>
          <option value="railscasts">railscasts</option>
          <option value="rubyblue">rubyblue</option>
          <option value="seti">seti</option>
          <option value="shadowfox">shadowfox</option>
          <option value="solarized dark">solarized dark</option>
          <option value="solarized light">solarized light</option>
          <option value="the-matrix">the-matrix</option>
          <option value="tomorrow-night-bright">tomorrow-night-bright</option>
          <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
          <option value="ttcn">ttcn</option>
          <option value="twilight">twilight</option>
          <option value="vibrant-ink">vibrant-ink</option>
          <option value="xq-dark">xq-dark</option>
          <option value="xq-light">xq-light</option>
          <option value="yeti">yeti</option>
          <option value="zenburn">zenburn</option>
        </select>
      </div>
    );
  }
}