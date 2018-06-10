// @flow
import React, {Component} from 'react';
import styles from './Button.module.css';

type Props = {
  children: string,
};

class Button extends Component<Props> {
  render() {
    const {children, ...props} = this.props;

    return (
      <button className={styles.root} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
