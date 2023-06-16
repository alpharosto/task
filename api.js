const express = require('express');
const app = express();
const fs = require('fs');
const Event = require('./eventsmodel');
const mongoose = require("mongoose");
app.use(express.json());

const events = JSON.parse(fs.readFileSync(`${__dirname}/events.json`));

app.get('/api/v3/app', async (req, res) => {
  try {
    const eventsData = await Event.find({});
    res.status(200).json(eventsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/v3/app/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/v3/app', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json(newEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/v3/app/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Cannot find any event" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/v3/app/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Cannot find any event by id" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 5000;

mongoose.connect('mongodb+srv://sauravkharat7875:12345@task.0tchbqn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(port, "127.0.0.1", () => {
      console.log(`App is running on port ${port}...`);
    });
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });
