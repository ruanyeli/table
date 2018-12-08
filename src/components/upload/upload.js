import React from 'react';
import Icon from '../icon';
import PropTypes from 'prop-types';
import _findIndex from 'lodash/findIndex';
import upload from './request';
import Progress from '../progress';
import s from './style';
import message from '../message';
import Button from '../button'
import { LocaleReceiver } from "../locale-provider";

const prefixCls = s.uploadPrefix;
function toArray(value) {
  let newValue = value;
  if (!value) {
    newValue = [];
  } else if (!Array.isArray(value)) {
    newValue = [value];
  }
  return newValue;
}

function noop() { }
class Upload extends React.Component {
  static defaultProps = {
    prefixCls,
    onChange: noop,
    multiple: false,
    fileList: '',
    note: '',
    showType: 'path',
    onChangeToUpload: false,
    event: {},
    headers: {},
    data: {},
    withCredentials: true,
    showProgress: false,
    action: '/',
    filename: 'file'
  }
  static propTypes = {
    accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fileList: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    note: PropTypes.string,
    showType: PropTypes.string,
    onChangeToUpload: PropTypes.bool,
    event: PropTypes.object,
    headers: PropTypes.object,
    data: PropTypes.object,
    withCredentials: PropTypes.bool,
    showProgress: PropTypes.bool,
    action: PropTypes.string,
    filename: PropTypes.string
  }
  constructor(props) {
    super(props);
    let fileList = toArray(props.fileList);
    let accept = toArray(props.accept);
    this.state = {
      fileList,
      accept,
      uploading: false,
      progressPercent: 0,
      status: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('fileList' in this.props) {
      this.setState({
        fileList: toArray(nextProps.fileList)
      })
    }
  }

  triggerChange = fileList => {
    const { multiple } = this.props;
    if (!('fileList' in this.props)) {
      this.setState({
        fileList
      })
    }
    this.props.onChange(multiple ? fileList : fileList[0]);
  }

  endProgress = (status = '', progressPercent = 0, uploading = false) => {
    this.setState({ progressPercent, uploading, status })
  }

  uploadAction = (fileList) => {
    const { event, withCredentials, showProgress, headers, data, filename, action } = this.props;

    if (!fileList) {
      fileList = this.state.fileList || []
    }
    fileList = fileList.filter(f => f.status !== 'success')

    if (!fileList.length) return;

    fileList.forEach(file => {
      file.status = 'uploading';
    })
    this.setState({
      uploading: true,
      progress: 0,
      status: ''
    })
    const uploadEvent = {
      onSuccess: r => {
        fileList.forEach(file => {
          file.status = 'success';
        })
        this.endProgress();
        event.onSuccess && event.onSuccess(r);
      },
      onError: e => {
        fileList.forEach(file => {
          file.status = 'error';
        })
        event.onError && event.onError(e);
        // this.endProgress('exception', this.state.progressPercent, true);
        this.endProgress();
      },
      onProgress: e => {
        if (showProgress) {
          this.setState({ progressPercent: Number(e.percent.toFixed(2)) })
        }
        event.onProgress && event.onProgress(e);
      }
    }
    const compile = upload({
      withCredentials,
      headers,
      data,
      ...uploadEvent,
      filename,
      files: fileList,
      action
    })
    this.uploadCompile = compile
    return compile;
  }

  handleFileChange = e => {
    const target = e.target;
    const value = target.value;
    const { multiple, onChangeToUpload } = this.props;
    let { accept, fileList } = this.state;
    if (value) {
      const filePath = value.slice(0, value.lastIndexOf('\\'));
      const files = Array.prototype.slice.call(target.files);
      files.forEach(file => {
        const index = _findIndex(accept, item => file.name.endsWith(item));
        if (index === -1 && accept.length) {
          message.warning('File format error');
          return;
        }
        file.path = `${filePath}${'\\'}${file.name}`;
        if (multiple) {
          fileList.push(file);
        } else {
          fileList = [file];
        }
      });
      if (onChangeToUpload) {
        this.triggerChange(fileList);
        this.uploadAction(files);
      } else {
        this.triggerChange(fileList);
      }
    }
  }

  handleClick = index => {
    let { fileList } = this.state;
    const { multiple } = this.props;
    fileList.splice(index, 1);
    if (!multiple) {
      fileList = '';
    }
    if (!('fileList' in this.props)) {
      this.setState({ fileList });
    }
    this.props.onChange(fileList);
  }

  saveFileRef = file => this.file = file;
  saveProgressWraperRef = p => this.progressWraper = p

  renderMain = (locale) => {
    const { prefixCls, note, children, showType, className, showProgress, multiple } = this.props;
    const { fileList, uploading, progressPercent, status } = this.state;
    const multipleProp = {};
    if (multiple) {
      multipleProp.multiple = multiple;
    }
    return [
      <div className={`${prefixCls}-file-select ${className || ''}`} key='select' onClick={() => {
        if (!uploading || status) {
          this.file.click();
        }
      }}>
        <input {...multipleProp} ref={this.saveFileRef} type='file' style={{ display: 'none' }} name='file' value='' className={`${prefixCls}-file-btn`} onChange={this.handleFileChange} />
        {children || <Button icon="upload">{locale.fileSelect}</Button>}
      </div>,
      ...note ? [<div className={`${prefixCls}-file-note`} key='note'>{note}</div>] : [],
      <div className={`${prefixCls}-file-list`} key='list' style={{marginBottom: fileList && fileList.length ? 7 : 0}}>
        {
          (fileList || []).map((file, index) => <div className={`${prefixCls}-file-single ${prefixCls}-file-single-${file.status || 'waiting'}`} key={index}>
            <Icon className="status" type={`${file.status === 'uploading' ? 'loading' : 'accessory'}`} />
            {file[showType]}
            <Icon type='cross' className='close' onClick={() => this.handleClick(index)} />
          </div>)
        }
      </div>,
      <div key="progress" ref={this.saveProgressWraperRef}>
        {
          showProgress && uploading && (() => {
            const statusProp = {};
            const { status, fileList } = this.state;
            const hasError = fileList.filter(f => f.status === 'error').length;
            if (status || hasError) {
              statusProp.status = status;
              statusProp.type = "line"
            } else {
              statusProp.type = "stripe"
            }
            return <div style={{ marginTop: -5 }}>
              <Progress {...statusProp} targetStatus="success" percent={progressPercent} width={this.progressWraper && (this.progressWraper.offsetWidth - 120) || 0} />
            </div>
          })()
        }
      </div>
    ]
  }

  render() {
    return <LocaleReceiver componentName="Upload">
      {this.renderMain}
    </LocaleReceiver>
  }
}

export default Upload;
