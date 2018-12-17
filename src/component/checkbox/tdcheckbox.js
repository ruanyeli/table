import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export default class TDCheckbox extends React.Component{
    static propTypes = {
        prefixCls:PropTypes.string,
        className:PropTypes.string,
        style:PropTypes.object,
        name:PropTypes.string,
        type:PropTypes.string,
        defaultChecked:PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        checked:PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        disabled:PropTypes.bool,
        onFocus:PropTypes.func,
        onBlur:PropTypes.func,
        onClick:PropTypes.func,
        tabIndex:PropTypes.string,
        readOnly:PropTypes.bool
    };

    static defaultProps = {
        prefixCls:'ed-checkbox',
        className:'',
        style:{},
        type:'checkbox',
        onFocus(){

        },
        onBlur(){

        },
        onChange(){
        }
    };

    constructor(props){
        super(props);
        const checked = 'checked' in props ? props.checked : props.defaultChecked;
        this.state ={
            checked
        };
    }

    componentWillReceiveProps(nextProps){
        if('checked' in nextProps){
            this.setState({
                checked:nextProps.checked
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){//返回true则重新加载
        return !shallowEqual(this.props,nextProps)||!shallowEqual(this.state,nextState);
    }

    handleChange = (e) =>{
        const {props} = this;
        if(props.disabled){
            return;
        }
        if(!('checked' in props)){
            this.setState({
                checked:e.target.checked
            });
        }
        props.onChange({
            target:{
                ...props,
                checked:e.target.checked
            },
            stopPropagation(){
                e.stopPropagation();
            },
            preventDefault(){
                e.preventDefault();
            } 
        });
    };

    render(){
        const{
            prefixCls,
            className,
            style,
            name,
            type,
            disabled,
            readOnly,
            tabIndex,
            onClick,
            onFocus,
            onBlur,
            ...others
        } = this.props;

        const globalProps = Object.keys(others).reduce((prev,key) => {
            if(key.substr(0,5) ==='data-'||key ==='role'){
                prev[key] = others[key];
            }
            return prev;
        },{});

        const {checked} = this.state;
        const classString = classNames(prefixCls,className,{
            [`${prefixCls}-checked`]:checked,
            [`${prefixCls}-disabled`]:disabled
        });


    return (
        <span className={classString} style={style}>
            <span className={`${prefixCls}-inner`}/>
            <input 
                name={name}
                type={type}
                readOnly={readOnly}
                disabled={disabled}
                tabIndex={tabIndex}
                className={className}
                checked={checked}
                onClick={onClick}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={this.handleChange}
                {...globalProps}
            />
        </span>
    )
    }

}
