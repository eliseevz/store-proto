import React from "react"

const Banner = (props) => {
    return (
        <div
            className="mt-5 d-flex justify-content-center align-items-center text-light"
            style={{width: "100vw", fontWeight: "bold", height: 70, background: `url(${props.url}) center center`}}
        >
            <span style={{background: "rgba(0, 0, 0, 0.8)", padding: 3, fontSize: 18}}>{props.text}</span>
        </div>
    )
}

export default Banner