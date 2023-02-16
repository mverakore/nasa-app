import axios from "axios"
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Polychromatic.module.css"

export default function Polychromatic() {

    const [image, setImage] = useState([])
    const [images, setImages] = useState([])
    const [time, setTime] = useState("loading")
    const [date, setDate] = useState("")
    const [coords, setCoords] = useState({})


    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

    const getPolychromatic = async () => {
        const res = await axios.get(url);
        const data = await res.data;
        console.log(data)

        const caption = data[0].caption;
        const date = data[0].date.split(" ")[0];
        const date_formatted = date.replaceAll("-", "/")
        let times = []
        let images = []

        for (let i = 0; i < data.length; i++) {
            let time = data[i].date.split(" ")[1];
            let coords = data[i].centroid_coordinates;
            let imageGrabbed = data[i].image;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imageGrabbed}.png`

            times.push(time);
            images.push({
                image: image,
                coords: coords,
                time: time
            })
        }

        setDate(date);
        setImages(images);

        setImage(images[0].image);
        setTime(times[0]);
        setCoords([images[0].coords.lat, images[0].coords.lon]);

        console.log(image);
    }


    useEffect(() => {
        getPolychromatic()
    }, [])

    return (
        <div className={styles.bg}>
            <h1>Polychromatic</h1>
            <div className={styles.topview} >
                <Image className={styles.image} src={image} alt={image} width={200} height={200} />
                <div>{time}</div>
                <div>{coords[0]}, {coords[1]}</div>
            </div>
            <table className={styles.cardcont}>
                <thead>
                    <tr className={styles.tr}>
                        <th>Time</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody} >
                    {images.map((e, i) => (
                        <tr key={i}>
                            <td>{e.time}</td>
                            <td>{e.coords.lat}</td>
                            <td>{e.coords.lon}</td>
                            <td><Image loading='lazy' className={styles.image} src={e.image} alt={i} width={200} height={200} /></td>
                            <td><button className={styles.viewbttn} onClick={() => {
                                setImage(e.image);
                                setTime(e.time);
                                setCoords([e.coords.lat, e.coords.lon]);
                                console.log(images[i].image);
                                document.body.scrollIntoView({ behavior: 'smooth' });
                            }}>View</button></td>
                        </tr >
                    ))}
                </tbody>
            </table>
        </div>
    )
}