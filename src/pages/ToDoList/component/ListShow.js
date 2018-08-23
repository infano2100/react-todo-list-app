import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Platform, Alert } from 'react-native'
import { Icon, ListItem, Text, Left, Body, Right, CheckBox } from 'native-base'
import moment from 'moment'
import PopupDialog from 'react-native-popup-dialog'

export class ListShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetal: false
    }

    this.alertConfirm = this.alertConfirm.bind(this)
  }

  alertConfirm(id) {
    Alert.alert(
      'Delete Todo List',
      'Are you sure delete this Todo List?',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => this.props.del(id)
        }
      ],
      { cancelable: false }
    )
  }
  render() {
    const { data, changeStatus, showEdit } = this.props
    const { showDetal } = this.state
    return (
      <ListItem thumbnail>
        <Left>
          <CheckBox
            checked={data.completed === true ? true : false}
            color="green"
            onPress={() => changeStatus(data.id)}
          />
        </Left>
        <Body>
          <Text style={data.completed === true ? styles.lineText : null}>
            {data.title}
          </Text>
          {showDetal === true ? (
            <View style={{ paddingTop: 20 }}>
              <Text note numberOfLines={2}>
                ID : {data.id}
              </Text>
              <Text note numberOfLines={10}>
                Description : {data.description}
              </Text>
              <Text note numberOfLines={2}>
                Date : {moment(data.createdAt).format('LLL')}
              </Text>
            </View>
          ) : null}
        </Body>
        <Right>
          <View style={{ flexDirection: 'row', marginTop: -5 }}>
            <Text
              onPress={() =>
                this.setState({ showDetal: !this.state.showDetal })
              }
              style={{ paddingRight: 20 }}
            >
              {showDetal === false ? 'View' : 'Close'}
            </Text>
            <View style={{ paddingRight: 20 }}>
              <Icon
                onPress={() => showEdit(data)}
                style={{ color: '#4da6ff' }}
                type="FontAwesome"
                name="pencil"
              />
            </View>
            <View>
              <Icon
                onPress={() => this.alertConfirm(data.id)}
                style={{ color: 'red' }}
                name="trash"
              />
            </View>
          </View>
        </Right>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  lineText: {
    textDecorationLine: 'line-through',
    color: 'green'
  }
})

ListShow.propTypes = {
  data: PropTypes.object.isRequired,
  del: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  showEdit: PropTypes.func.isRequired
}

export default ListShow
