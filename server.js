const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",               // Local frontend
    "https://todo-frontend.onrender.com"  
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Render automatically injects PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running → Port ${PORT}`));
