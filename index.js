import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let userDetails = [];
let nextId = 1;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

// get basic text
app.get("/", (req, res) => {
  res.send("Hello from me");
});

// get all users details
app.get("/users", (req, res) => {
  res.send(userDetails);
});

// get a specific user details
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = userDetails.find((eachUser) => eachUser.userId === parseInt(id));
  if (!user) {
    res.status(404).send("user not found");
  } else {
    res.status(200).send(user);
  }
});

// upload a user data
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    userId: nextId++,
    name,
    age,
  };
  userDetails.push(newUser);
  res.status(201).send(newUser);
});

// update an user data
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const user = userDetails.find((eachUser) => eachUser.userId === parseInt(id));
  if (!user) {
    return res.status(404).send("user not found");
  }
  let updatedName = name;
  let updatedAge = age;
  userDetails.map((eachUser) => {
    if (eachUser.userId === parseInt(id)) {
      return { ...eachUser, name: updatedName, age: updatedAge };
    }
    return eachUser;
  });
  res.status(204).send("user updated successfully");
});

// delete an user data
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUsers = userDetails.filter(
    (eachUser) => eachUser.userId !== parseInt(id)
  );
  userDetails = [...updatedUsers];

  res.status(200).send("user deleted successfully");
});
