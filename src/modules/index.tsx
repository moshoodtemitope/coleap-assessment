import { useState, useRef, useEffect } from 'react';


import { GetCarsData } from "../utils/api-service";
import { ACarItem } from "../shared/components/car-item"

import "../styles/index.scss";


const AllCarsPage = () => {
    const [isLoadingData, setIsLoading] = useState(false);
    const [filter, setDataFilter] = useState("");
    const [carsData, setDataFecthed] = useState<any>([]);
    const [carColors, setAllColors] = useState<any>([]);
    const [colorChosen, setColorFilter] = useState();
    const [allCarsStore, setCarsStore] = useState<any>([]);

    useEffect(() => {
        let getColors: any = [];
        setIsLoading(true)
        GetCarsData().then(cars => {
            cars.forEach((item: any) => {

                item.colors.map((eachColor: any) => {
                    if (getColors.indexOf(eachColor) === -1) {
                        getColors.push(eachColor)
                    }
                })


            });
            // let getColors = 
            setAllColors(getColors)
            setCarsStore(cars)
            setDataFecthed(cars)
            setIsLoading(false)
        })


    }, [])

    const compareValues = (key: any) => {
        return function innerSort(a: any, b: any) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            let varA, varB;
            // if(key="price")
            varA = key == "price" ? parseFloat(a[key.split(" ")[0]]) : parseFloat(a[key["distance"]]);
            varB = key == "price" ? parseFloat(b[key.split(" ")[0]]) : parseFloat(b[key["distance"]]);
            // if(typeof a[key] =="string"){
            //     varA = parseFloat( a[key.split(" ")[0]]);
            //     varB = parseFloat(b[key.split(" ")[0]]);
            // }
            // if(typeof a[key] =="object"){
            //     varA = parseFloat( a[key.split(" ")[0]]);
            //     varB = parseFloat(b[key.split(" ")[0]]);
            // }



            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return comparison;
        };
    }
    const sortCars = (e: any) => {

        setDataFilter(e.target.value)
        let sortedCars = carsData.sort(compareValues(e.target.value))

        setDataFecthed([...sortedCars]);
    }

    const filerbyColor = (itemSelected: any) => {
        let allCardsData = allCarsStore
        let selectColor = itemSelected.target.value;
        setColorFilter(selectColor)
        
        if(selectColor){
            let filerterdData = allCardsData.filter((eachCar: any) => eachCar.colors.indexOf(selectColor) > -1)
            setDataFecthed([...filerterdData]);
        }else{
            setDataFecthed(allCardsData)
        }

    }



    const CarsList = ({ allCars }: any) => {

        return (
            <div className="cars-wrap">
                <div className="sort-cars">
                    <div className="each-sort">
                        Sort by
                        <select name="" value={filter} id="" onChange={(e) => sortCars(e)}>
                            <option value="">Select</option>
                            <option value="range">Range</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <div className="each-sort">
                        Filter color:
                        <select name="" value={colorChosen} id="" onChange={(e) => filerbyColor(e)}>
                            <option value="">All</option>
                            {
                                carColors.map((eachItem: any, index: any) => {
                                    return (
                                        <option key={index} value={eachItem}>{eachItem}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>

                <div className="all-cars">

                    {
                        allCars.map((eachCar: any, index: any) => {
                            return <ACarItem carData={eachCar} key={index} />
                        })
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

            {
                carsData.length >= 1 &&
                <CarsList allCars={carsData} />
            }

        </div>
    )
}
export default AllCarsPage;