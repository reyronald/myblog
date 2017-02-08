import React from 'react';
import { browserHistory } from 'react-router';

class NewBlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.titleInput.value,
      content: this.contentInput.value,
      tags: this.tagsInput.value.split(/[ ]+/),
    };

    fetch('api/post', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...post })
    }).then(r => r.json())
      .then(p => browserHistory.push(`post/${p._id}`))
      .catch(err => console.error(err));
  }

  render() {
    /* eslint-disable brace-style */
    return (
      <div>
        <hr />
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Add Post</legend>

            <div>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" ref={input => { this.titleInput = input; }}/>
            </div>

            <div>
              <textarea name="post" cols="100" rows="30" ref={input => { this.contentInput = input; }}>
              </textarea>
            </div>

            <div>
              <label htmlFor="tags">Tags</label>
              <input id="tags" name="tags" type="text" ref={input => { this.tagsInput = input; }}/>
            </div>

            <input type="submit" value="submit post" />
            </fieldset>
          </form>
      </div>
    );
  }
}

export default NewBlogPost;
