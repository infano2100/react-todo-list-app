import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Text, View, Platform, Keyboard } from 'react-native'
import {
  Container,
  Button,
  Form,
  Item,
  Input,
  Toast,
  Root,
  Textarea,
  List,
  Tab,
  Tabs,
  ScrollableTab,
  Spinner
} from 'native-base'
import { Font, Constants } from 'expo'
import PopupDialog from 'react-native-popup-dialog'

import TopBar from './component/TopBar'
import ListShow from './component/ListShow'
import { addTodo, delTodo, editTodo, changeStatusTodo } from '../../actions'

export class ToDoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataToDo: {
        title: '',
        description: ''
      },
      btnDisabled: true,
      btnDisabledColor: false,
      showToast: false,
      edit_id: '',
      fontLoaded: false
    }

    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showPopup = this.showPopup.bind(this)
    this.showPopupEdit = this.showPopupEdit.bind(this)
    this.handleClearInput = this.handleClearInput.bind(this)
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  async add() {
    await this.props.addTodo(this.state.dataToDo)

    await this.popupDialog.dismiss()
    await Keyboard.dismiss()

    Toast.show({
      text: 'Add Success',
      buttonText: 'Okay',
      type: 'success',
      onClose: () => {
        this.setState({
          dataToDo: {
            title: '',
            description: ''
          },
          btnDisabled: true,
          btnDisabledColor: false
        })
      }
    })
  }

  async edit() {
    const dataEdit = Object.assign(
      {
        id: this.state.edit_id
      },
      this.state.dataToDo
    )
    await this.props.editTodo(dataEdit)

    await this.popupDialog.dismiss()
    await Keyboard.dismiss()

    Toast.show({
      text: 'Edit Success',
      buttonText: 'Okay',
      type: 'success',
      onClose: () => {
        this.setState({
          dataToDo: {
            title: '',
            description: ''
          },
          btnDisabled: true,
          btnDisabledColor: false,
          edit_id: ''
        })
      }
    })
  }

  del(id) {
    this.props.delTodo(id)

    Toast.show({
      text: 'Delete Success',
      buttonText: 'Okay',
      type: 'success'
    })
  }

  changeStatus(id) {
    this.props.changeStatusTodo(id)

    Toast.show({
      text: 'Change Status Success',
      buttonText: 'Okay',
      type: 'success'
    })
  }

  showPopup() {
    this.popupDialog.show()
  }

  showPopupEdit(data) {
    this.popupDialog.show()
    this.setState({
      dataToDo: {
        title: data.title,
        description: data.description
      },
      btnDisabled: false,
      edit_id: data.id
    })
  }

  handleChange(data) {
    const { dataToDo } = this.state

    this.setState({
      dataToDo: Object.assign(dataToDo, data)
    })

    if (dataToDo.title === '' || dataToDo.description === '') {
      this.setState({
        btnDisabled: true,
        btnDisabledColor: false
      })
    } else {
      this.setState({
        btnDisabled: false,
        btnDisabledColor: true
      })
    }
  }

  handleClearInput() {
    this.setState({
      dataToDo: {
        title: '',
        description: ''
      },
      btnDisabled: true,
      btnDisabledColor: false,
      edit_id: ''
    })
  }

  render() {
    const { dataToDo, edit_id } = this.state
    const { list } = this.props
    return this.state.fontLoaded ? (
      <Root>
        <Container>
          <PopupDialog
            dialogStyle={{ marginTop: -200 }}
            width={0.9}
            height={Platform.OS === 'ios' ? 0.4 : 0.5}
            ref={popupDialog => {
              this.popupDialog = popupDialog
            }}
            onDismissed={() => this.handleClearInput()}
          >
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form>
                <Item
                  error={this.state.inputError}
                  regular
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <Input
                    value={dataToDo.title}
                    placeholder="Title"
                    onChangeText={val => this.handleChange({ title: val })}
                  />
                </Item>
                <Textarea
                  value={dataToDo.description}
                  rowSpan={3}
                  bordered
                  placeholder="Description"
                  onChangeText={val => this.handleChange({ description: val })}
                />
              </Form>

              <Button
                style={{ marginTop: 20 }}
                full
                disabled={this.state.btnDisabled}
                primary={this.state.btnDisabledColor}
                onPress={() => (edit_id !== '' ? this.edit() : this.add())}
              >
                <Text style={{ color: '#fff' }}> Save </Text>
              </Button>
            </View>
          </PopupDialog>

          <View style={styles.statusBar} />

          <TopBar add={this.showPopup} />

          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="ToDo List">
              {list !== '' ? (
                <List>
                  {list.map((data, index) => (
                    <ListShow
                      key={index}
                      data={data}
                      del={this.del}
                      changeStatus={this.changeStatus}
                      showEdit={this.showPopupEdit}
                    />
                  ))}
                </List>
              ) : null}
            </Tab>
            <Tab heading="Completed">
              {list !== '' ? (
                <List>
                  {list.map(
                    (data, index) =>
                      data.completed === true ? (
                        <ListShow
                          key={index}
                          data={data}
                          del={this.del}
                          changeStatus={this.changeStatus}
                          showEdit={this.showPopupEdit}
                        />
                      ) : null
                  )}
                </List>
              ) : null}
            </Tab>
          </Tabs>
        </Container>
      </Root>
    ) : (
      <Spinner style={{ flex: 1, justifyContent: 'center' }} />
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  },
  form: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

const mapStateToProps = state => {
  return {
    list: state.data
  }
}

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTodo,
      delTodo,
      editTodo,
      changeStatusTodo
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList)
