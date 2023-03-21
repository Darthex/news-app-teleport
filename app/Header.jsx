'use client'
import React from "react";
import {useRouter} from "next/navigation";
import searchImg from "./(images)/search.png"
import newspaper from "./(images)/newspaperLight.png"
import Image from "next/image";
import keywords from "./keywords.json"


export default function Header() {

    const [search, setSearch] = React.useState('')
    const router = useRouter()

    function handleSearch(search) {
        setSearch(search)
        router.push(`/${search}`)
    }

    function handleEnter(e) {
        if(e.key === 'Enter') {
            handleSearch(search)
        }
    }

    function focusFunction() {
        document.getElementById("ddown").style.display = "block";
    }
    function outFocusFunction() {
        document.getElementById("ddown").style.display = "none";
    }


    const [category, setCategory] = React.useState('')

    return (
        <nav>
            <div id="nav-logo-section" className="nav-section">
                <h1 onClick={() => {router.push(('/')); setCategory('')}}>News App</h1>
                <Image src={newspaper} alt="" className="search-image"/>
            </div>
            <div id="nav-link-section" className="nav-section">
                <h1 onClick={() => {router.push(`/category/business`); setCategory('business')}}
                    style={{borderBottom: `1px solid ${category==='business' ? 'white' : 'transparent'}`}}
                >Business</h1>
                <h1 className="" onClick={() => {router.push(`/category/sports`); setCategory('sports')}}
                    style={{borderBottom: `1px solid ${category==='sports' ? 'white' : 'transparent'}`}}
                >Sports</h1>
                <h1 className="" onClick={() => {router.push(`/category/entertainment`); setCategory('entertainment')}}
                    style={{borderBottom: `1px solid ${category==='entertainment' ? 'white' : 'transparent'}`}}
                >Entertainment</h1>
                <h1 className="" onClick={() => {router.push(`/category/technology`); setCategory('technology')}}
                    style={{borderBottom: `1px solid ${category==='technology' ? 'white' : 'transparent'}`}}
                >Technology</h1>
            </div>
            <div id="nav-search-section" className="nav-section">
                <input autoComplete="off" className="search-bar" type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." onKeyDown={handleEnter} onFocus={focusFunction} onBlur={outFocusFunction}/>
                <div className="dropdown" id="ddown">
                    {keywords.filter((item) => {
                        const searchTerm = search.toLowerCase()
                        const keys = item.key.toLowerCase()
                        return searchTerm && keys.includes(searchTerm) && keys !== searchTerm
                    })
                        .map((item) => (
                            <div onMouseDown={() => {handleSearch(item.key)}} className="dropdown-row" key={item.key}>{item.key}</div>
                        )).slice(0,10)
                    }
                </div>
                <button onClick={() => handleSearch(search)} className="search-button">
                    <Image src={searchImg} alt="" className="search-image"/>
                </button>
            </div>
        </nav>
    )
}
