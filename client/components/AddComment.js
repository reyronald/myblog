import React from 'react';

class AddComment extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleSubmitComment(this.contentInput.value);
    this.contentInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend> Add Comment </legend>
          <div>
            <textarea ref={input => {
              this.contentInput = input;
            }} name="comment" cols="50" rows="3"></textarea>
          </div>
          <input type="submit" value="Submit comment" />
        </fieldset>
      </form>
    );
  }
}

AddComment.propTypes = {
  handleSubmitComment: React.PropTypes.func.isRequired
};

export default AddComment;
