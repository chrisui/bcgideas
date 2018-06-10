// @flow
import React, {Component} from 'react';
import styles from './IdeaList.module.css';

import IdeaListItem from './components/IdeaListItem';

type Props = {
  ideas: Idea[],
  onDeleteIdea: Function,
  onSaveIdea: Function,
};

/** Component for rendering our list of ideas */
class IdeaList extends Component<Props> {
  render() {
    const {ideas, onDeleteIdea, onSaveIdea} = this.props;

    return (
      <ul className={styles.root}>
        {ideas.map(idea => (
          <IdeaListItem
            key={idea.id}
            idea={idea}
            onDelete={onDeleteIdea}
            onSave={onSaveIdea}
          />
        ))}
      </ul>
    );
  }
}

export default IdeaList;
