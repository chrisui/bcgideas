// @flow
import React, {Component} from 'react';
import styles from './App.module.css';
import {fetchIdeas, saveIdea, deleteIdea, draftIdea} from '../../data/ideas';

import Button from '../Button';
import IdeaList from '../IdeaList';
import DataContainer from '../DataContainer';

type Props = {};

/** Our root application component responsible for bringing everything together */
class App extends Component<Props> {
  render() {
    return (
      <DataContainer
        getData={fetchIdeas}
        actions={{deleteIdea, saveIdea, draftIdea}}
      >
        {({data, actions, query, setQuery}) => (
          <>
            <header className={styles.header}>
              <h1>Ideas</h1>
              <div className={styles.actions}>
                <select
                  className={styles.sort}
                  value={query.sort}
                  onChange={event =>
                    setQuery({sort: event.currentTarget.value})
                  }
                >
                  <option value="id">Sort by Created Date</option>
                  <option value="title">Sort by Title</option>
                </select>
                <Button onClick={actions.draftIdea}>New Idea</Button>
              </div>
            </header>
            <section>
              {data ? (
                <IdeaList
                  ideas={data}
                  onDeleteIdea={actions.deleteIdea}
                  onSaveIdea={actions.saveIdea}
                />
              ) : (
                'Loading...'
              )}
            </section>
          </>
        )}
      </DataContainer>
    );
  }
}

export default App;
