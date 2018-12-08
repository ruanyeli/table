// /**
//  * Created by Session on 17/6/1.
//  */

// import React, {Component} from 'react';
// import s from './style/index';
// import cn from 'classnames';

// export default class Loading extends Component {
//   static defaultProps = {
//     prefixLoad: s.loadingPrefix,
//     loading: true,
//     size: 'default'
//   };

//   render() {
//     const {prefixLoad, text, size, loading, className, style} = this.props;
//     const children = this.props.children ? this.props.children : [];
//     let classTmp = prefixLoad + '-container-graph';
//     let classNameValue = cn(
//       classTmp,
//       {
//         [`${classTmp}-show-text`]: !!text
//       },
//       {
//         [`loading-${size}`]: size !== 'default'
//       }
//     )
//     let textClassName = cn(
//       `${prefixLoad}-container-text`,
//       {
//         [`${prefixLoad}-container-text-${size}`]: size !== 'default'
//       }
//     )
//     console.log('child', children, React.Children);
    
//     return (
//       <div style={{position: 'relative'}}>
//         {
//           loading ? (
//             <div className={prefixLoad}>
//               <div className={`${prefixLoad}-container`}>
//                 <div className={classNameValue}>
//                   <div />
//                   <div />
//                   <div />
//                   <div />
//                   <div />
//                   <div />
//                   <div />
//                   <div />
//                 </div>
//                 <div className={textClassName}>
//                   {text}
//                 </div>
//               </div>
//             </div>
//           ) : ''
//         }
//         <div className={`${prefixLoad}-content`} style={{
//           opacity: loading ? 0.7 : 1,
//           filter: loading ? 'blur(1px)' : ''
//         }}>
//           {
//             React.Children.map(children.filter(child => child !== undefined), child => (<div className={className} style={style}>{child} </div>))
//           }
//         </div>
//       </div>
//     );
//   }
// }

/**
 * Created by Session on 17/6/1.
 */

import React, {Component} from 'react';
import s from './style/index';
import cn from 'classnames';

export default class Loading extends Component {
  static defaultProps = {
    prefixLoad: s.loadingPrefix,
    loading: true,
    size: 'default'
  };

  render() {
    const {prefixLoad, text, size, loading, className, style} = this.props;
    let classTmp = prefixLoad + '-container-graph';
    let classNameValue = cn(
      classTmp,
      {
        [`${classTmp}-show-text`]: !!text
      },
      {
        [`loading-${size}`]: size !== 'default'
      }
    )
    let textClassName = cn(
      `${prefixLoad}-container-text`,
      {
        [`${prefixLoad}-container-text-${size}`]: size !== 'default'
      }
    )
    return (
      <div style={{position: 'relative'}}>
        {
          loading ? (
            <div className={prefixLoad}>
              <div className={`${prefixLoad}-container`}>
                <div className={classNameValue}>
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
                <div className={textClassName}>
                  {text}
                </div>
              </div>
            </div>
          ) : ''
        }
        <div className={`${prefixLoad}-content`} style={{
          opacity: loading ? 0.7 : 1,
          filter: loading ? 'blur(1px)' : ''
        }}>
          {
            React.Children.map(this.props.children, child => (<div className={className} style={style}>{child} </div>))
          }
        </div>
      </div>
    );
  }
}