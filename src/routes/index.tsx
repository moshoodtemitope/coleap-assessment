import { Route, Routes } from "react-router-dom";
import AllCarsPage from "../modules/index"
import CarDetailsPage from "../modules/details"


const AppRoutes = ()=>{
    return(
        <Routes>
          <Route path="/" element={<AllCarsPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
        </Routes>
    )
}
export default AppRoutes;