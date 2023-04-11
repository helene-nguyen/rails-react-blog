import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Article = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: '' });

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

  const articleDescription = addHtmlEntities(article.description);

  const deleteArticle = () => {
    const url = `/api/v1/articles/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => navigate('/articles'))
      .catch((error) => console.log(error.message));
  };

  const editArticle = () => {};

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={'https://res.cloudinary.com/dkizcn12a/image/upload/v1681216844/article_jxbudn.jpg'}
          alt={`article image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">{article.title}</h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <p className="display-4">{articleDescription}</p>
          <p className="lead">{articleDescription}</p>
          <p className="lead">{articleDescription}</p>
          <div className="col-sm-12 col-lg-2 d-flex justify-content-start">
            <Link to={`/article/${params.id}/edit`} className="mr-3 btn btn-sm btn-outline-dark">
              Edit Article
            </Link>
            <button type="button" className="btn btn-sm btn-danger" onClick={deleteArticle}>
              Delete Article
            </button>
          </div>
        </div>
        <Link to="/articles" className="btn btn-link">
          Back to articles
        </Link>
      </div>
    </div>
  );
};

export default Article;
