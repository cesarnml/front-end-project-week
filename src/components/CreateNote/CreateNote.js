import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Badge } from 'reactstrap'

import { createNote } from '../../actions'
import './CreateNote.css'

class CreateNote extends Component {
  state = {
    tags: [],
    tag: '',
    title: '',
    content: ''
  }

  handleSubmit = event => {
    event.preventDefault()
    const { title, content, tags } = this.state
    const note = { title, content, tags }
    this.props.createNote(note)
    this.setState({
      tags: [],
      tag: '',
      title: '',
      content: ''
    })
    this.props.history.push('/')
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  handleTag = e => {
    e.preventDefault()
    const value = this.state.tag

    this.setState({
      tags: [value, ...this.state.tags],
      tag: ''
    })
  }

  render () {
    return (
      <Container fluid className='CreateNote px-0'>
        <form className='form-group mx-3 flex-column create-form'>
          <label className='input-label'>
            <h2 className='label-h2'>Create New Note:</h2>
          </label>
          <input
            name='title'
            className='input-title form-control'
            type='text'
            placeholder='Note Title'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <section>
            <label className='label-tag'>Add Tag:</label>
            <input
              name='tag'
              className='input-tag'
              type='text'
              placeholder='Note Tag'
              onChange={this.handleChange}
              value={this.state.tag}
            />
            <button
              className='btn-sm btn-success ml-2'
              onClick={this.handleTag}
            >
              Add Tag
            </button>
            {this.state.tags.map((tag, index) => (
              <Badge
                pill
                className='badge-tag ml-2'
                color='primary'
                key={tag + index}
                onClick={() => {
                  this.setState({
                    tags: this.state.tags.filter(curTag => tag !== curTag)
                  })
                }}
              >
                {tag} x
              </Badge>
            ))}
          </section>
          <textarea
            name='content'
            className='input-body mt-3'
            type='textarea'
            placeholder='Note Content'
            onChange={this.handleChange}
            value={this.state.content}
          />
          <button className='sav-btn' type='submit' onClick={this.handleSubmit}>
            Save
          </button>
        </form>
      </Container>
    )
  }
}

export default connect(null, { createNote })(CreateNote)
