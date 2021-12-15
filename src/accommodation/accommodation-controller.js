import { retrieveAccommodationByLocation, retrieveAccommodations } from "./accommodation-model.js";


export async function getAllAccommodationsController(req,res){

    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const accommodations = await retrieveAccommodationByLocation(lat, lon);
    res.status(200).json(accommodations);

}