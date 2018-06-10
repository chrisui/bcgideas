// @flow
import React, {Component} from 'react';
import styles from './IdeaListItem.module.css';
import generateColor from 'string-to-color';

type Props = {
  idea: Idea,
  onSave: Idea => Promise<*>,
  onDelete: Idea => Promise<*>,
};

type State = {
  editing: ?{
    title: string,
    body: string,
  },
};

class IdeaListItem extends Component<Props, State> {
  state = {editing: null};

  handleFocus = () => this.setState({editing: this.props.idea});

  handleBlur = async () => {
    await this.props.onSave(this.state.editing);
    this.setState({editing: null});
  };

  handleChangeBody = (event: SyntheticEvent<HTMLInputElement>) =>
    this.setState({
      editing: {...this.state.editing, body: event.currentTarget.value},
    });

  handleChangeTitle = (event: SyntheticEvent<HTMLInputElement>) =>
    this.setState({
      editing: {...this.state.editing, title: event.currentTarget.value},
    });

  handleDelete = () => this.props.onDelete(this.props.idea);

  render() {
    const {idea} = this.props;
    const {editing} = this.state;

    return (
      <li className={styles.root}>
        <i className={styles.delete} onClick={this.handleDelete}>
          Delete
        </i>
        <input
          className={styles.title}
          value={editing ? editing.title : idea.title}
          name="title"
          onFocus={this.handleFocus}
          onChange={this.handleChangeTitle}
          onBlur={this.handleBlur}
        />
        <textarea
          className={styles.body}
          value={editing ? editing.body : idea.body}
          name="body"
          onFocus={this.handleFocus}
          onChange={this.handleChangeBody}
          onBlur={this.handleBlur}
        />
      </li>
    );
  }
}

export default IdeaListItem;
