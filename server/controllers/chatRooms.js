const bcrypt = require("bcryptjs");
const ChatRoom = require("../models/Room");

const getAllChatRooms = async (req, res) => {
  try {
    const allRoomsCollection = await ChatRoom.find({});
    const roomsWithPrivateProp = allRoomsCollection.map((room) => {
      const { password, ...rest } = room.toJSON();
      return password
        ? { ...rest, isPrivate: true }
        : { ...rest, isPrivate: false };
    });

    res.send({ chatRooms: roomsWithPrivateProp });
  } catch (err) {
    res.send(404).send("Rooms haven't found");
  }
};

const createChatRoom = async (req, res) => {
  const hashedPassword =
    req.body.password &&
    (await new Promise((resolve) =>
      (async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        resolve(hashedPassword);
      })()
    ));

  const newChatRoom = new ChatRoom({
    name: req.body.name,
    ...(hashedPassword && { password: hashedPassword }),
    createdBy: req.body.createdBy,
    description: req.body.description,
    tags: [...req.body.tags],
  });
  try {
    await newChatRoom.save((err, createdRoom) => {
      if (err) return "Error occured during room creation, try again!";
      console.log(createdRoom);
      res.send({ createdRoom });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const signInToRoom = async (req, res) => {
  const roomId = req.params.id;
  const roomPasword = req.body.password;
  const roomToSignIn = await ChatRoom.findById(roomId);

  if (!roomToSignIn) return res.status(404).send("Room not found");

  const isValidPassword = await bcrypt.compare(
    roomPasword,
    roomToSignIn.password
  );

  if (!isValidPassword) return res.status(401).send("Invalid password");

  res.status(200).send("Succesfully logged into room");
};

module.exports = {
  getAllChatRooms,
  createChatRoom,
  signInToRoom,
};
