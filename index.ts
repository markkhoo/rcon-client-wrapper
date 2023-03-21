import * as dotenv from "dotenv"
import express from "express"
import RconWrapper from "./rcon-wrapper"

dotenv.config();
const app = express();
const port = 3003;
const rcon = new RconWrapper('localhost', 25575, 'password');

app.get("/", (req, res) => {
  return res.status(200).json({
    sucess: true,
  })
});

app.get('/connect', (req, res) => {
  rcon.connect().then(() => {
    return res.status(200).json({
      success: true,
      message: "rcon connected"
    })
  }).catch(err => {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  })
});

app.get('/end', (req, res) => {
  rcon.end().then(() => {
    return res.status(200).json({
      success: true,
      message: "rcon disconnected"
    })
  }).catch(err => {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  })
});

app.get('/connectionstate', (req, res) => {
  rcon.isConnected().then(rs => {
    return res.status(200).json({
      success: true,
      state: rs
    })
  })
})

app.get('/whitelist', (req, res) => {
  rcon.send("whitelist list").then(rs => {
    return res.status(200).json({
      success: true,
      message: rs
    })
  }).catch(err => {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  })
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});