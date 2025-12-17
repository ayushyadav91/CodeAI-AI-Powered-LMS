import app from "./app.js";
import connectDB from "./config/connectDB.js";

const PORT = process.env.PORT || 8000;

//DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
