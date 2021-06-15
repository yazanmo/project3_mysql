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
	// const auth=req.query.author;
	// const query='SELECT users.id  FROM users  WHERE firstName=?'
	// console.log("qu",query)
	// const arr=[auth];
	// db.query(query,arr, (err, result) => {
	// 	if (err) throw err;
	// 	console.log('RESULT: ',result);
	// 	res.json(result)
	// });

	const auth = req.query.author;
	const query = `SELECT *  FROM  articles
	INNER JOIN  users ON users.id=author_id`;
	//const arr=[auth];
	db.query(query, (err, result) => {
		const arr = []
		if (err) throw err;
		result.map((elem, i) => {
			if (elem.firstName == auth && elem.is_deleted !== 1) {
				arr.push({ title: elem.title, description: elem.description })
			}
		})
		//	console.log('RESULT: ', result[0]);
		res.json(arr)
	});
};
const getAnArticleById = (req, res) => {
	// const _id = req.params.id;
	// if (!_id) return res.status(404).json('not found');
	// articlesModel
	// 	.findOne({ _id })
	// 	.populate('author', 'firstName -_id')
	// 	.exec()
	// 	.then((result) => {
	// 		res.status(200).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
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
	console.log("title",title)
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
	// const id = req.params.id;

	// articlesModel
	// 	.findByIdAndDelete(id)
	// 	.then((result) => {
	// 		res.status(200).json({
	// 			success: true,
	// 			message: `Success Delete atricle with id => ${id}`,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};
const deleteArticlesByAuthor = (req, res) => {
	// const author = req.body.author;
	// articlesModel
	// 	.deleteMany({ author })
	// 	.then((result) => {
	// 		res.status(200).json({
	// 			success: true,
	// 			message: `Success Delete atricle with id => ${author}`,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
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