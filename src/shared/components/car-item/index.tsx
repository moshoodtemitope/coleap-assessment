import "./index.scss"
import { Link } from "react-router-dom"

export const ACarItem = ({ carData }: any) => {
    return (
        // <div className="acar-item">
            <Link className="acar-item" to={`/car/${carData.id}`}>
            <div className="carphoto">
                <img src={carData.photo} alt="" />
            </div>
            <div className="car-info">
                <div className="car-make">{carData.make} {carData.model} </div>
                <div className="car-price">{carData.price} </div>
            </div>
            </Link>

        // </div>
    )
}