import React from 'react'
import PropTypes from 'prop-types'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

export class TopBar extends React.Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>ToDo List</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.add()}>
            <Icon style={{ fontSize: 35 }} name="add" />
          </Button>
        </Right>
      </Header>
    )
  }
}

TopBar.propTypes = {
  add: PropTypes.func.isRequired
}

export default TopBar
