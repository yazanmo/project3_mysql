const db = require('./../../db/db');
const getAllArticles = (req, res) => {
	const query = `SELECT * FROM articles`;
	db.query(query, (err, result) => {
		if (err) throw err;
		console.log('RESULT: ', result);
		res.json(result)
	});
};

const getArticlesByAuthor = (req, res) => {

	const auth = req.query.author;
	const query = `SELECT *  FROM  articles
	INNER JOIN  users ON users.id=author_id`;
	db.query(query, (err, result) => {
		const arr = []
		if (err) throw err;
		result.map((elem, i) => {
			if (elem.firstName == auth && elem.is_deleted !== 1) {
				arr.push({ title: elem.title, description: elem.description })
			}
		})
		res.json(arr)
	});
};

const getAnArticleById = (req, res) => {
	const auth = req.params.id;
	const query = `SELECT users.firstName ,users.id  FROM  articles
	INNER JOIN  users ON users.id=${auth}`;  
	db.query(query, (err, result) => {
		const arr = []
		if (err) throw err;		
		res.json(result)
	});

};

const createNewArticle = (req, res) => {
	const { title, description, author_id } = req.body;
	const query = `INSERT INTO articles (title, description,author_id ) VALUES (?,?,?)`;
	const data = [title, description, author_id];
	db.query(query, data, (err, results) => {
		console.log(results);
		res.json(results)
	});
};
const updateAnArticleById = (req, res) => {
	const id = req.params.id;
	const { title, description } = req.body;
	const query = `UPDATE articles
    SET title=?, description = ?
    WHERE id=${id}`;
	const data = [title, description];
	db.query(query, data, (err, results) => {
		console.log(results);
		res.json(results)
	});
};
const deleteArticleById = (req, res) => {
	const id = req.params.id;
	const query = `DELETE FROM articles WHERE id=${id}`;
	db.query(query, (err, results) => {
		console.log(results);
		res.json(results)
	});
};

const deleteArticlesByAuthor = (req, res) => {
	const auth = req.query.author;
	const query = `SELECT *  FROM  articles
	INNER JOIN  users ON users.id=author_id AND  users.firstName=?`;
	const arr = [auth]
	db.query(query,arr,(err, result) => {	
		if (err) throw err;
		console.log("roaa",result)
		

	});

};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};