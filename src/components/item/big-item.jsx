import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Box as BoxImage, Item, UserLogo } from '../../assets/images/additional'
import { Box as BoxApi, User } from '../../services/api'
import TokenService from '../../services/token'
import Loading from '../сommon/button/loading'
import { itemColors, itemGradients } from "./item-colors"
import classes from './item.module.css'

const BigItem = (props) => {
    const navigate = useNavigate()
    const [isStart, setIsStart] = useState(true)
    const boxApi = new BoxApi()
    const userApi = new User()
    const [isFlipped, setIsFlipped] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const [box, setBox] = useState(null)
    const [userLogo, setUserLogo] = useState(UserLogo)

    useEffect(() => {
        const interval = setInterval(async () => {
            setIsStart(false)
            setUserLogo(await userApi.getImageById(props.userId))
        }, isStart ? 100 : 5000)

        return () => clearInterval(interval)
    })

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isClick && !box) {
                setIsClick(false)

                let temp = await boxApi.getBox(props.boxId)
                temp = await boxApi.pullBoxWithImage(temp)

                setBox(temp)
            }
        }, 10)

        return () => clearInterval(interval)
    })

    let color = props.color ? props.color : "white"
    let itemColor = itemColors[color]
    let gradientColor = itemGradients[color]
    var d = new Date(props.date)
    var date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

    return (
        <div className={classes.big_item}>
            <div className={isFlipped ? classes.big_item_inner_flipped : classes.big_item_inner} onClick={() => {
                setIsClick(true)
                setIsFlipped(!isFlipped)
            }}>
                <div className={classes.big_item__face__front} style={{ background: gradientColor, borderBottom: `5px solid ${itemColor}` }}>
                    <img src={props.image ?? Item} alt="" />
                    <p className={classes.item_name}>{props.name.length > 25 ? props.name.substring(0, 25) + "..." : props.name}</p>
                    <p className={classes.item_date}>{date}</p>
                </div>
                <div className={classes.big_item__face__back} style={{ background: itemGradients["orange"], borderBottom: `5px solid ${itemColors["orange"]}` }}>
                    {
                        box ? <img src={box.image ?? BoxImage} alt="" /> : null
                    }
                    {
                        box ?
                            <p className={classes.item_name}>
                                {box.name.length > 25 ? props.name.substring(0, 25) + "..." : box.name}
                            </p> : null
                    }
                    {
                        box ?
                            <p className={classes.item_date}>{date}</p> : null
                    }
                    {
                        !box ?
                            <Loading click={() => { }} isLoading={true} cursor="default" /> : null
                    }
                </div>
            </div>
            {
                isStart ?
                    <Loading click={() => { }} isLoading={true} cursor="default" /> :
                    <img
                        alt=""
                        src={userLogo}
                        className={classes.logo_user}
                        onClick={() => {
                            if (TokenService.getUser()?.id === props.userId) {
                                navigate("/profile")
                            }
                            else {
                                console.log("open window user")
                            }
                        }} />
            }
        </div>
    )
}

export default BigItem