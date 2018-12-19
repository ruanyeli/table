import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';
import TDCheckbox from '../checkbox/tdcheckbox';
import s from './style';


export default class Radio extends React.Component{

  static PropTypes={
    classnames: PropTypes.string,
    type:PropTypes.string,
    style:PropTypes.object,
    checked: PropTypes.oneOfType([PropTypes.number,PropTypes.bool]),
    defaultChecked:PropTypes.oneOfType([PropTypes.number,PropTypes.bool])
  }

  static defaultProps = {
    classnames:'',
    type:'radio',
    style:{},
    defaultChecked:false,
    prefixCls:s.radioPrefix
  }

  shouldComponentUpdate(nextProps,nextState,nextContext){
    return !shallowEqual(nextProps,this.props)||!shallowEqual(nextContext,this.context)||!shallowEqual(nextState,this.state);
  }




  render(){
    const { type,classnames,style,checked,children,...others} =this.props;
    const classname = cn(classname,{
      [`${prefixCls}-wrapper`]:true
    });



    return(
      <label classNames={classname}>

      </label>);

  
  }

}