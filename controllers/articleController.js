const pool = require('../client');
const path = require('path');

const getAllArticles = (req, res) => {
  pool
    .query('SELECT * FROM blogarticles ORDER BY articleid')
    .then((data) =>
      res.status(200).json({ code: 200, message: 'OK', data: data.rows })
    )
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

const getOneArticle = (req, res) => {
  const { id } = req.params;
  const getOneArticle = {
    text: 'SELECT * FROM blogarticles WHERE articleid=$1',
    values: [id],
  };
  pool
    .query(getOneArticle)
    .then((data) => {
      if (data.rows.length !== 0) {
        res.status(200).json({ code: 200, message: 'OK', data: data.rows });
      } else {
        res.status(404).json({ code: 404, error: 'Article does not exist!' });
      }
    })
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

const createOneArticle = (req, res) => {
  const { articleID, title, description, category } = req.body;
  const createOneArticle = {
    text:
      'INSERT INTO blogarticles (articleID, title, description, category) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [articleID, title, description, category],
  };
  pool
    .query(createOneArticle)
    .then((data) =>
      res
        .status(201)
        .json({ code: 201, message: 'Article created', data: data.rows })
    )
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

const uploadImageArticle = (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;
  const uploadImageArticle = {
    text: 'UPDATE blogarticles SET imagename=$2 WHERE articleid=$1',
    values: [id, filename],
  };
  pool
    .query(uploadImageArticle)
    .then((data) =>
      res.status(201).json({ code: 200, message: 'Image uploaded' })
    )
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

module.exports = {
  getAllArticles,
  getOneArticle,
  createOneArticle,
  uploadImageArticle,
};
