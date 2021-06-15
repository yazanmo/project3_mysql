const db = require('./../../db/db');
const bcrypt = require('bcrypt');


const createNewAuthor = async(req, res) => {
	const password1 = req.body.password;    
	const encryptedPassword = await bcrypt.hash(password1, 10)
	const firstName=req.body.firstName;
	const lastName=req.body.lastName;
	const age=req.body.age;
	const country=req.body.country;
	const email=req.body.email;
	const password=encryptedPassword;
	const role_id=req.body.role_id;


	//const passs=bcrypt.hash(password, 10)
	const query = `INSERT INTO users (firstName, lastName, age, country, email, password,role_id) VALUES (?,?,?,?,?,?,?)`;
	const data = [firstName, lastName, age, country, email,password,role_id];
	db.query(query, data, (err, results) => {
		if (err) {
			console.log(err)
		}
		console.log(results);
		res.json(results)
	});


};

module.exports = {
	createNewAuthor,
};