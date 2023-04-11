import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Articles from '../components/Articles';
import Article from '../components/Article';
import NewArticle from '../components/NewArticle';
import EditArticle from '../components/EditArticle';

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/article/:id/edit" element={<EditArticle />} />
      <Route path="/article" element={<NewArticle />} />
    </Routes>
  </Router>
);
