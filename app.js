const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const usersRouter = require("./routes/usersRoutes");

//midleware function to have access to the data from req.body
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from Midware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/users", getAllUsers);
// app.post("/users", createNewUser);
// app.get("/users/:id", getOneUser);
// app.patch("/users/:id", updateUser);
// app.delete("/users/:id", deleteUser);

app.use("/users", usersRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
