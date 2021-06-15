const db = require('./../../db/db');

const createNewRole = (req, res) => {
	const { role } = req.body;
	const query = `INSERT INTO roles (role) VALUES (?)`;
	const data = [role];
	db.query(query, data, (err, results) => {
		console.log(results);
		res.json(results)
	});

};
module.exports = {
	createNewRole,
};