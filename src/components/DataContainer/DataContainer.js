// @flow
import * as React from 'react';
import {mapValues} from 'lodash';

type Props = {
  children: Function,
  getData: Object => Promise<*>,
  actions: {[k: string]: () => Promise<*>},
};

type State = {
  data: *,
  query: {},
};

/**
 * Component for managing data fetching and invalidation lifecycles.
 * In a more complex system this would be deeper integrated into data schema
 * and therefore enable optimisation of queries (ie. graph caching)
 */
class DataContainer extends React.Component<Props, State> {
  state = {data: null, query: {}};

  componentDidMount() {
    this.handleRefetch();
  }

  handleRefetch = async () => {
    const data = await this.props.getData(this.state.query);
    this.setState({data});
  };

  handleSetQuery = (query: {}) => this.setState({query}, this.handleRefetch);

  render() {
    const {children, actions} = this.props;
    const {data, query} = this.state;
    const boundActions = mapValues(actions, func => (...args) =>
      func(...args).then(() => this.handleRefetch())
    );

    return (
      <>
        {children({
          query,
          setQuery: this.handleSetQuery,
          data,
          actions: boundActions,
        })}
      </>
    );
  }
}

export default DataContainer;
