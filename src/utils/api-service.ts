import { pathUrls } from "./api-paths"
const axios = require('axios');


export const GetCarsData = async () => {
   
    return await fetch(pathUrls.All_CARS)
    .then(data => data.json())

   
}

export const GetACarData = async (id: any) => {
   

    return await fetch(`${pathUrls.All_CARS}/${id}`)
    .then(data => data.json())

}


