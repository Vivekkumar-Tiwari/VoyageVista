const Listing = require("../models/listing")

// Index
module.exports.index = async(req, res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs", {allListings})
}

// New
module.exports.renderNewForm = async(req, res) => {
    res.render("./listings/new.ejs")
}

// show
module.exports.showListing = async(req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate:{
                path: "author"
            },
        })
        .populate("owner")
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!!")
        res.redirect("/listings")
    }
    res.render("./listings/show.ejs", {listing})
}

// Create
module.exports.createListing = async(req, res, next) => {
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash("success", "New Listing Created!!")
    res.redirect("/listings")
}

// Edit
module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id)
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!!")
        res.redirect("/listings")
    }
    res.render("./listings/edit.ejs", {listing})
}

// Update
module.exports.updateListing = async(req,res) => {
    let {id} = req.params
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    req.flash("success", "Listing Updated!!")
    res.redirect(`/listings/${id}`)
}

// delete
module.exports.deleteListing = async(req, res) => {
    let {id} = req.params
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!!")
    res.redirect("/listings")
}