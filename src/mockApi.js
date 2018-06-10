// Mock out "restful" api for demonstration/test purposes
import {uniqueId, sortBy} from 'lodash';
import queryString from 'query-string';

const ideas = [
  {id: '1', title: 'My First Idea', body: 'Its a good one!'},
  {id: '2', title: 'Drop Stretch', body: 'Improve Interview Coding Challenge'},
  {id: '3', title: 'Provide API', body: 'Change the game'},
];

class Response {
  constructor(json) {
    this._json = json;
  }
  json() {
    return this._json;
  }
}

const _fetch = window.fetch;
window.fetch = function(url, options, ...args) {
  // GET ideas/new
  if (/ideas\/new/.test(url) && !options) {
    const idea = {
      id: uniqueId('idea'),
      title: 'Draft',
      body: 'Add idea body here...',
    };
    ideas.push(idea);
    console.log('MOCK API: Draft idea created', idea);
    return Promise.resolve(new Response(idea));
  }

  // GET ideas ?sort=xxx
  if (/ideas/.test(url) && !options) {
    const parsedUrl = queryString.parseUrl(url);
    const sortKey = parsedUrl.query.sort ? parsedUrl.query.sort : 'id';
    const sortedIdeas = sortBy([...ideas], [sortKey]);
    if (sortKey === 'id') sortedIdeas.reverse();

    console.log('MOCK API: Fetched sorted ideas', sortedIdeas);
    return Promise.resolve(new Response(sortedIdeas));
  }

  // POST ideas/update
  if (/ideas\/update/.test(url)) {
    const data = JSON.parse(options.body);
    const index = ideas.findIndex(i => i.id === data.id);
    const idea = {...ideas[index], ...data};
    ideas.splice(index, 1, idea);
    console.log('MOCK API: Updated idea', idea);
    return Promise.resolve(new Response(idea));
  }

  // POST ideas/delete
  if (/ideas\/delete/.test(url)) {
    const data = JSON.parse(options.body);
    const index = ideas.findIndex(i => i.id === data.id);
    const idea = ideas[index];
    ideas.splice(index, 1);
    console.log('MOCK API: Deleted idea', idea);
    return Promise.resolve(new Response(idea));
  }

  return _fetch(url, options, ...args);
};
