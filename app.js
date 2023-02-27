const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json);
const dbPath = path.join(__dirname, "userData.db");
let db = null;

const SqlServerConnection = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Sever has been started");
    });
  } catch (error) {
    console.log(`db error:${error.message}`);
  }
};
SqlServerConnection();

const checkUserName = (request) => {
  const query = `SELECT * from userData WHERE username=${request.username}`;
  return query !== undefined;
};

const checkPasswordLength = (request) => {
  let pswd = request.password;
  if (pswd.length < 5) return true;
  else false;
};

app.post(`/register`, async (req, res) => {
  const { username, name, password, gender, location } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  switch (true) {
    case checkUserName(req.body):
      res.status(400);
      res.send(`User already exists`);
      console.log("hai");
      break;
    case checkPasswordLength(req.body):
      res.status(400);
      res.send(`Password is too short`);
      console.log("hai");
      break;
    default:
      let query = `INSERT INTO username(username,name,password,gender,location) 
                                VALUES("${username}","${name}","${hashedPassword}","${gender}","${requestBody.location}")`;
      await db.run(query);
      res.status(200);
      res.send(`User created successfully`);
      console.log("hai");
      break;
  }
});
