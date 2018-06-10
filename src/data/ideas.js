// @flow
import {get, post} from '../utils/api';

/** Fetch a list of ideas given a query */
export async function fetchIdeas(query: {sort: string}) {
  return get('ideas', query);
}

/** Save a given idea model */
export async function saveIdea(idea: Idea) {
  // in an ideal world this would be aware of local state
  // and so be able to only send a diff for the idea being saved
  return post('ideas/update', idea);
}

/** Delete a given idea model */
export async function deleteIdea(idea: Idea) {
  return post('ideas/delete', idea);
}

/** Create a new idea in a draft mode ready for initial editing */
export async function draftIdea() {
  return get('ideas/new');
}
