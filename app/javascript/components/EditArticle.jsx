import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState({ title: '' });
  const [description, setDescription] = useState('');

  useEffect(() => {
    //   Get one article
    const url = `/api/v1/articles/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => setArticle(response))
      .catch((error) => navigate('/'));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/<br> <br>/g, '\n');
  };

  const articleTitle = article.title;
  const articleDescription = addHtmlEntities(article.description);

  //   In the stripHtmlEntities function, you replace the < and > characters with their escaped values. This way, you won’t store raw HTML in your database
  const stripHtmlEntities = (str) => {
    return String(str).replace(/\n/g, '<br> <br>').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/articles/edit/${params.id}`;

    if (title.length == 0 || description.length == 0) return;

    const body = {
      title,
      description: stripHtmlEntities(description),
    };

    // To protect against Cross-Site Request Forgery (CSRF) attacks, Rails attaches a CSRF security token to the HTML document. This token is required whenever a non-GET request is made.
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => navigate(`/article/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Edit article to our awesome article collection.</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="articleTitle">Title</label>
              <input
                type="text"
                // value={articleTitle}
                name="title"
                id="articleTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>

            <label htmlFor="description">Content</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              required
              //   value={articleDescription}
              onChange={(event) => onChange(event, setDescription)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Edit Article
            </button>
            <Link to="/articles" className="btn btn-link mt-3">
              Back to articles
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
