import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Terminal } from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
import s from './style';

const prefixCls = s.webshellPrefix;
Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

export default class WebShell extends Component {
  static defaultProps = {
    prefixCls,
    style: {},
    options: { cursorBlink: true }
  }

  static propTypes = {
    socketURL: PropTypes.string,
    socket: PropTypes.object,
    onOpen: PropTypes.func,
    onError: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
    title: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.term = new Terminal(this.props.options);
  }

  handleResize = () => {
    this.term.fit();
  };

  close = () => {
    this.term.destroy();
    this.socket.close();
  };

  createSocket = (socketURL, socket) => {
    if (socket) {
      this.socket = socket;
    } else {
      this.socket = new WebSocket(socketURL);
    }
    this.socket.onopen = () => {
      this.term.attach(this.socket);
      this.props.onOpen && this.props.onOpen();
    }
    this.socket.onerror = this.props.onError;
    this.socket.onclose = this.props.onClose;
  };

  componentWillMount() {
    const { onClose, socketURL, socket } = this.props;
    if (!socketURL && !socket) {
      onClose && onClose();
      this.close();
    }
  }

  componentDidMount() {
    this.term.open(this.container);
    this.term.winptyCompatInit();
    this.term.webLinksInit();
    this.term.fit();
    this.term.focus();
    // this.term.prompt = () => {
    //   this.term.write('\r\n$ ');
    // };
    // this.term._core.register(this.term.addDisposableListener('key', (key, ev) => {
    //   const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
  
    //   if (ev.keyCode === 13) {
    //     this.term.prompt();
    //   } else if (ev.keyCode === 8) {
    //    // Do not delete the prompt
    //     if (this.term.x > 2) {
    //       this.term.write('\b \b');
    //     }
    //   } else if (printable) {
    //     this.term.write(key);
    //   }
    // }));
  
    // this.term._core.register(this.term.addDisposableListener('paste', (data, ev) => {
    //   this.term.write(data);
    // }));
    this.createSocket(this.props.socketURL, this.props.socket);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.close();
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.socket && (this.props.socket !== nextProps.socket) || !nextProps.socket && this.props.socketURL !== nextProps.socketURL && !!nextProps.socketURL) {
      this.term.detach(this.socket);
      this.socket.close();
      this.createSocket(nextProps.socketURL, nextProps.socket);
    }
  }

  render() {
    const { className, prefixCls, style } = this.props;
    return (
      <div id="webshell-container" ref={c => this.container = c} className={cn(prefixCls, className)} style={style}/>
    );
  }
}
