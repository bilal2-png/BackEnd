
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
    path: "./env"
});


connectDB()
// const app = express();
// ;(async()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGOBD_URL}/${DB_NAME}`);
//         app.on("error", (err) =>{
//             console.log("eerr",err);
//             throw err
//         })
//         app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
//         console.log("Connected to MongoDB");
//     } catch (err) {
//         console.error("Failed to connect to MongoDB", err);
//     }
// })()