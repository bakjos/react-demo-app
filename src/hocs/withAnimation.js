import PropTypes from "prop-types";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const withAnimation = (WrappedComponent) => {
  class ComponentWithAnimation extends React.Component {
    constructor(props) {
      super(props);
      this.componentRef = React.createRef(null);
    }

    render() {
      const { animationClasses, animationTimeout, ...otherProps } = this.props;

      return (
        <SwitchTransition>
          <CSSTransition
            classNames={animationClasses}
            timeout={{ enter: animationTimeout, exit: animationTimeout }}
            nodeRef={this.componentRef}
            key={this.props.refKey}
          >
            <WrappedComponent ref={this.componentRef} {...otherProps} />
          </CSSTransition>
        </SwitchTransition>
      );
    }
  }

  ComponentWithAnimation.defaultProps = {
    animationTimeout: 600,
  };

  ComponentWithAnimation.propTypes = {
    animationClasses: PropTypes.string.isRequired,
    animationTimeout: PropTypes.number,
    refKey: PropTypes.any.isRequired,
  };

  return ComponentWithAnimation;
};

export default withAnimation;
