const data = {
  data: [
    {
      id: "0",
      name: "John",
    },
    {
      id: "1",
      name: "Alex",
    },
    {
      id: "2",
      name: "Mark",
    },
  ],
};

const getUsers = (req, res) => {
  res.json({
    data,
    extra: "from controller!"
  });
};

const getUserByParamsID = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const fetchedUser = data.data.filter((el) => el.id === id)[0];
  console.log(fetchedUser);
  if (fetchedUser) {
    res.json({
      ok: true,
      user: fetchedUser,
      extra: "from controller!"
    });
  } else {
    res.status(404).json({
      ok: false,
      message: "User with id " + id + " not found",
      extra: "from controller!"
    });
  }
};

const addUser = (req, res) => {
  const name = req.body.name;
  const newId = data.data.length.toString();
  const newUser = {
    ...req.body,
    name,
    id: newId,
  };
  data.data.push(newUser);
  res.status(200).json({
    ok: true,
    message: "User with id " + newId + " created",
    user: newUser,
    extra: "from controller!"
  });
};

module.exports = {
  getUsers,
  getUserByParamsID,
  addUser,
};
