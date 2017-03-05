import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  render() {
    console.log(this.props);
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.handleClose}
        basic
        size='small'
      >
        <Modal.Content>
          <h3>Mineral Deposits</h3>
          {this.props.data.map(mineral => 
            <div>{mineral}</div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
