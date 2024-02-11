// const express = require("express");

// // Middlewares
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const firebaseAdmin = require("firebase-admin");
// const { getFirestore } = require('firebase-admin/firestore');
// dotenv.config();

// // Starting Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });

// app.use(cors());

// // Initializing Firebase

// const serviceAccount = require("./utils/firebaseServiceKey.json");

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
// });
// const firebaseDb = getFirestore();

// // Routes
// const userRoutes = require("./routes/userRoutes");

// app.use('/api/users', userRoutes);