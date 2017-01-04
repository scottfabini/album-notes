import Button from '../Button/Button';
import React, {Component, PropTypes} from 'react';
require('./style.css');

class Dialog extends Component {
  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }

  render() {
    /** 
      A Dialog consists of a header, body, footer, and cancel/confirm button
    */
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{this.props.header} </div>
          <div className="DialogBody">{this.props.children} </div>
          <div className="DialogFooter">
          {this.props.hasCancel 
            ? <span
                className="DialogDismiss"
                onClick={this.props.onAction.bind(this, 'dismiss')}
              >
              Cancel
              </span>
            : null
          }
          <Button onClick={this.props.onAction.bind(this, 
            this.props.hasCancel ? 'confirm' : 'dismiss')}>
            {this.props.confirmLabel}
          </Button>
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes= {
  /**
    header: String for the Dialog box header
    confirmLabel: String for the confirm button
    modal: Specifies whether to create a modal dialog
    (modal dialogs cover the page and the user must select an option)
    onAction: A function to perform whne the dialog 'confirm' is pressed
    hasCancel: Boolean of whether to provide a cancel option in the dialog
  */
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool
};

Dialog.defaultProps = {
  confirmLabel: 'ok',
  modal: false,
  onAction: () => {},
  hasCancel: true
};

export default Dialog;
