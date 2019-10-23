import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import { FlexRow } from '../../styles'
import Copy from '../../copy'
import { formatDateTime } from '../../utils'
import MaterialButton from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton
} from 'draft-js-buttons'

import './draft.css'

let { object } = PropTypes

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 30,
    height: 30
  },
  icon: {
    marginLeft: theme.spacing.unit
  }
})

const {
  labels: { noteLabel }
} = Copy

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content; space-around;
  width:${props => props.width}px;
`
const EditorContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  min-width: 400px;
  min-height: 20em;
  border: 1px solid #dddddd;
  padding: 1em;
`
const ButtonContainer = FlexRow.extend`
  justify-content: center;
  padding: 1em;
  width: 75%;
`
const Label = styled.span`
  display: block;
  fonnt-size: 1.2em;
  padding: 1em;
  margin-botton: 0.25em;
  border: 1px solid #dddddd;
`
const ListContainer = styled.div`
  width: 80%;
  padding: 1em;
  text-align: left;
`
const DeleteContainer = styled.div`
  width: 40px;
  height: 40px;
`

const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    Separator,
    UnorderedListButton,
    OrderedListButton
  ]
})

const { Toolbar } = toolbarPlugin
const plugins = [toolbarPlugin]

class CustomToolbarEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  componentDidMount() {
    let { notes = [] } = this.props
    this.setState({ notes })
  }

  onChange = editorState => {
    this.setState({
      editorState
    })
  }

  focus = () => {
    this.editor.focus()
  }

  toJson = () => {
    let { onSave } = this.props
    let { editorState, notes } = this.state
    let note = convertToRaw(editorState.getCurrentContent())

    let d = new Date()
    let date = formatDateTime(noteLabel, d)
    let id = d.getTime()
    notes.push({ date, id, note })
    this.setState({ notes }, () => {
      if (onSave) {
        onSave(note)
      }
    })
  }

  openSavedNote = id => {
    let { notes } = this.state

    let { note } = notes.find(o => o.id === id)
    const contentState = convertFromRaw(note)
    this.setState({
      editorState: EditorState.createWithContent(contentState)
    })
  }

  deleteNote = id => {
    let { notes } = this.state
    let nw = notes.filter(o => o.id !== id)
    this.setState({ notes: nw })
    if (this.props.onDelete) {
      this.props.onDelete(id)
    }
  }

  onClose = () => {
    let { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  render() {
    let { notes } = this.state
    let { classes, width } = this.props
    let { deleteNote, toJson, openSavedNote, onClose } = this

    return (
      <Column width={width}>
        <EditorContainer onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            placeholder="Enter some notes..."
            ref={element => {
              this.editor = element
            }}
          />
          <Toolbar />
        </EditorContainer>
        <ButtonContainer>
          <MaterialButton
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={toJson}
          >
            Save
          </MaterialButton>
          <MaterialButton
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={onClose}
          >
            Close
          </MaterialButton>
        </ButtonContainer>
        {notes &&
          notes.length > 0 && (
            <ListContainer>
              {notes.map(({ date, id }) => {
                return (
                  <FlexRow key={id}>
                    <Label
                      onClick={() => {
                        openSavedNote(id)
                      }}
                    >
                      {date}
                    </Label>
                    <DeleteContainer>
                      <MaterialButton
                        variant="contained"
                        className={classes.button}
                        onClick={() => {
                          deleteNote(id)
                        }}
                      >
                        <Delete className={classes.icon} />
                      </MaterialButton>
                    </DeleteContainer>
                  </FlexRow>
                )
              })}
            </ListContainer>
          )}
      </Column>
    )
  }
}

CustomToolbarEditor.porpTypes = {
  classes: object
}

export default withStyles(styles)(CustomToolbarEditor)
