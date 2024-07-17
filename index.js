const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection");
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();
const app = express();

const PORT = 8081;

app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
