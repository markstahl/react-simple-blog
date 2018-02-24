import React, { Component } from 'react';
import ArticleShow from '../components/ArticleShow';

class ArticleShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    }
  }

  componentDidMount() {
    let articleId = document.getElementById('show').getAttribute('data-id');
    fetch(`http://localhost:4567/api/v1/articles/${articleId}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(data => {
        let article = this.state.article;
        article.id=data.id;
        article.title=data.title;
        article.body=data.body;
        this.setState({ article: article});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render() {
    return(
      <ArticleShow
        key={this.state.article.id}
        id={this.state.article.id}
        title={this.state.article.title}
        body={this.state.article.body}
      />
    )
  }
}

export default ArticleShowContainer;
