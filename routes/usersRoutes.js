const express = require("express");
const fs = require("fs");

const usersData = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

const getAllUsers = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "SUCCESS",
    requestedAt: req.requestTime,
    results: usersData.length,
    data: {
      usersData,
    },
  });
};

const createNewUser = (req, res) => {
  // console.log(req.body);
  const newId = usersData[usersData.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  usersData.push(newUser);
  fs.writeFile(
    `${__dirname}/data/data.json`,
    JSON.stringify(usersData),
    (err) => {
      res.status(201).json({
        status: "SUCCSESS",
        data: {
          user: newUser,
        },
      });
    }
  );
};

const getOneUser = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1; // to convert to number
  const newUserId = usersData.find((el) => el.id === id);

  if (!usersData) {
    return res.status(404).json({
      status: "FAIL",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "SUCCESS",
    data: {
      newUserId,
    },
  });
};

const updateUser = (req, res) => {
  if (req.params.id * 1 > usersData.legth) {
    return res.status(404).json({
      status: "FAIL",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "SUCCESS",
    data: {
      user: "<updated user here>",
    },
  });
};

const deleteUser = (req, res) => {
  if (req.params.id * 1 > usersData.legth) {
    return res.status(404).json({
      status: "FAIL",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "SUCCESS",
    data: null,
  });
};

app.use("/users", usersRouter);
const usersRouter = express.Router();

usersRouter("/").get(getAllUsers).post(createNewUser);

usersRouter("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = usersRouter;
