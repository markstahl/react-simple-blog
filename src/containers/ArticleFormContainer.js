import React, { Component } from 'react';
import TitleField from '../components/TitleField';
import BodyField from '../components/BodyField';

class ArticleFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleId: '',
      articleTitle: '',
      articleBody: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateTitle = this.validateTitle.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if(
      this.validateTitle(this.state.articleTitle) &&
      this.validateBody(this.state.articleBody)
    ) {
      let formPayLoad = {
        title: this.state.articleTitle,
        body: this.state.articleBody,
      };
      this.props.addNewArticle(formPayLoad);
    }
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value })
  }

  validateTitle(title) {
    if (title.trim() === '') {
      let newError = { title: 'Title field may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.firstName
      this.setState({ errors: errorState })
      return true
    }
  }

  validateBody(body) {
    if (body.trim() === '') {
      let newError = { body: 'Body field may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.lastName
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    return(
      <form className="new-article-form callout" onSubmit={this.handleFormSubmit}>
        <TitleField
          content={this.state.articleTitle}
          label="Article Title"
          name="articleTitle"
          handlerFunction={this.handleChange}
        />
        <BodyField
          content={this.state.articleBody}
          label="Article Body"
          name="articleBody"
          handlerFunction={this.handleChange}
        />

        <div className="button-group">
          <button className="button">Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}

export default ArticleFormContainer;
