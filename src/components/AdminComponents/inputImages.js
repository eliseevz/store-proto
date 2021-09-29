import React, {useState} from "react"
import classes from "./inputImages.module.css"

const InputImage = (props) => {
//
//     const firebaseConfig = {
//         apiKey: "AIzaSyBiRmQAjj4m-4K6AbMw_Y-pssvLXHPlo-s",
//         authDomain: "online-store-prototype-c73d8.firebaseapp.com",
//         databaseURL: "https://online-store-prototype-c73d8-default-rtdb.firebaseio.com",
//         projectId: "online-store-prototype-c73d8",
//         storageBucket: "online-store-prototype-c73d8.appspot.com",
//         messagingSenderId: "250856126872",
//         appId: "1:250856126872:web:8f337ae5a337d8a27913ed"
//     };
//
// // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//
//     const storage = getStorage(app)
//
//     console.log(storage)

    const [drag, setDrag] = useState(false)

    const [img, setImg] = useState(undefined)

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        setImg(files[0])
        console.log(files[0])
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <img src={img} alt=""/>
            { drag
                ? <div
                    className={classes.dropArea}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    отпустите файл, чтобы загрузить его
                </div>
                : <div
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    className={classes.dropArea}
                >
                    перетащите файл, чтобы загрузить
                </div>
            }
        </div>
    )
}

export default InputImage