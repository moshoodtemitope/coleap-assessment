import { useState, useRef, useEffect } from 'react';

import { GetACarData } from "../utils/api-service";
import { useParams } from 'react-router-dom';

import "../styles/index.scss";


const CarDetailsPage = () => {
    const [isLoadingData, setIsLoading] = useState(false);
    const [carsData, setDataFecthed] = useState();
    const { id } = useParams()


    useEffect(() => {

        setIsLoading(true)
        GetACarData(id).then(carsDetails => {
            setDataFecthed(carsDetails)
            setIsLoading(false)

        })



    }, [])

    const CarDetails = ({ carData }: any) => {

        return (
            <div className="car-details">
                <div className="carphoto">
                    <img src={carData.photo} alt="" />
                </div>
                <div className="car-info">
                    <div className="horizontal">
                        <div className="car-make">{carData.make} {carData.model} </div>
                        <div className="car-price">{carData.price} </div>
                    </div>

                    {carData?.colors &&
                        <div className="car-colors">
                            <div className="feature-txtx">Color varations: </div>
                            <div className="all-features-txt">[
                                {
                                    carData.colors.map((eachColor: any, index: any) => {
                                        return (
                                            <div style={{background:`${eachColor}`}} className="each-feature color-text" key={index}>
                                                {/* {eachColor} */}
                                            </div>
                                        )
                                    })
                                }]
                            </div>
                        </div>
                    }
                    {carData?.range &&
                        <div className="car-colors">
                            <div className="feature-txtx">Range: {carData.range.distance}{carData.range.unit} </div>
                        </div>
                    }
                </div>
            </div>
        )
    }



    
    return (
        <div className="allcars-page-wrap">
            {
                isLoadingData &&
                <div className="loading">Please wait...</div>
            }

            {carsData && <CarDetails carData={carsData} />}

        </div>
    )
}
export default CarDetailsPage;