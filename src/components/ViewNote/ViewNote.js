import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, Badge } from 'reactstrap'

import { deleteNote, fetchNote, clearNote } from '../../actions'
import './ViewNote.css'

class ViewNote extends Component {
  state = {
    modal: false
  }

  handleDelete = event => {
    event.preventDefault()
    this.props.deleteNote(this.props.match.params.id)
    this.props.history.push('/')
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount () {
    this.props.fetchNote(this.props.match.params.id)
  }

  componentWillUnMount () {
    console.log('clearing note')
    this.props.clearNote()
  }

  render () {
    return (
      <div className='ViewNote'>
        <div className='note-form'>
          <Link
            className='note-edit'
            to={`/update/${this.props.match.params.id}`}
          >
            edit
          </Link>
          <button className='note-delete' onClick={this.toggle}>
            delete
          </button>
          <Modal
            className='modal-modal'
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalBody className='modal-body'>
              Are you sure you want to delete this?
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                className='delete-button'
                onClick={this.handleDelete}
              >
                Delete
              </Button>
              <Button
                color='success'
                onClick={this.toggle}
                className='no-button'
              >
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <h2 className='note-title'>
          {this.props.note.title}
        </h2>
        <p className='note-content'>
          {this.props.note.content}
        </p>
        <hr />
        <section style={{ marginLeft: '20px' }}>
          {this.props.note.tags
            ? this.props.note.tags.map((tag, index) => (
              <Badge
                pill
                style={{
                  background: 'RGB(54, 192, 195)',
                  border: '1px solid RGB(151, 151, 151)'
                }}
                className='ml-1'
                key={tag.value + index}
              >
                {tag.value}
              </Badge>
            ))
            : null}
        </section>
      </div>
    )
  }
}
const mapStateToProps = ({ note }) => {
  return { note }
}
export default connect(mapStateToProps, { deleteNote, fetchNote, clearNote })(
  ViewNote
)
