const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("../Travels/models/listing.js")
const path = require("path")

const MONGO_URL = "mongodb://localhost:27017/Travel"

main().then(()=>{
    console.log("Connected To DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>{
    res.send("Hi, I am root")
})

app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs", {allListings})
})

// app.get("/testListing", async(req, res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "by the lake",
//         price: 1200,
//         location: "Deheradun, UK",
//         country: "India"
//     })

//     await sampleListing.save()
//     console.log("Sample was Saved");
//     res.send("Successful")
// })

app.listen(8080, (req,res)=>{
    console.log("App is listning")
})
