'use client'
import React from "react";
import axios from "axios";
import Image from "next/image";
import plus from "@/app/(images)/plus.png";
import right from "@/app/(images)/right-arrow.png";
import newsImage from "@/app/(images)/news.jpg";

const mountedStyle = { animation: "inAnimation 250ms ease-in" };
const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards"
};

export default function Page({params}) {
    const [category, setCategory] = React.useState(params.category)
    const [data, setData] = React.useState([])
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [bool, setBool] = React.useState(true)
    React.useEffect(() => {
        axios.get(`https://newsdata.io/api/1/news?apikey=pub_19255b7730c22202bce0660ecda04bdadd04b&category=${category}&country=us`)
            .then((res) => setData(res.data.results))
    }, [category])

    function handleLeft() {
        setBool( true)
        setCurrentIndex(prevState => prevState - 1 < 0 ?  data.length - 1: prevState - 1)
    }
    function handleRight() {
        setBool(true)
        setCurrentIndex(prevState => prevState + 1 < data.length ? prevState + 1 : 0)
    }

    return(
        <main>
            {data &&
                data.map((value, index) => <article key={index} data-index = {index} data-status = {index === currentIndex ? "true" : index > currentIndex ? "after" : "before"}>
                    {bool ?
                        <div className="article-image-section article-section" >
                            {value.image_url !== null ?
                                <img
                                    src={value.image_url}
                                    alt=""
                                    className="news-image" style={bool ? mountedStyle : unmountedStyle}/>
                                :
                                <Image
                                    src= {newsImage}
                                    alt=""
                                    className="news-image" style={bool ? mountedStyle : unmountedStyle}/>}
                        </div>
                        :
                        <div className="article-content-section article-section" style={bool ? unmountedStyle : mountedStyle}>
                            <p>
                                {value.content ? value.content : "No Content"}
                            </p>
                        </div>
                    }

                    <div className="article-description-section article-section">
                        <p>
                            {value.description && value.description.slice(0,100)}...
                        </p>
                        <h3>
                            Author- {value.creator && value.creator.length < 50 ? value.creator[0] : "Unknown"}
                        </h3>
                    </div>

                    <div className="article-title-section article-section">
                        <h1><strong>{value.title}</strong></h1>
                        <a><Image src={plus} alt="" className="right-arrow" onClick={() => setBool(prevState => !prevState)}/></a>
                    </div>

                    <div className="article-nav-section article-section">
                        <button className="arrow-container" onClick={handleLeft}>
                            <a className="arrow-icon"><Image src={right} alt="" className="left-arrow"/></a>
                        </button>
                        <button className="arrow-container" onClick={handleRight}>
                            <a className="arrow-icon"><Image src={right} alt="" className="right-arrow"/></a>
                        </button>
                    </div>
                </article>)
            }
        </main>
    )
}
