import React from "react";
import { Helmet } from "react-helmet";
import { ItemRoulette, BoxGroup, Banner } from "../../components";
import SearchBar from "../../components/search-bar/search-bar";
import ReviewSlider from "../../components/review/review-slider";

class Game extends React.Component {
    title = "InCase - ";
    boxesOne = [
        {
            id: "asdasdasdasd",
            name: "Box11",
            cost: 99990,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "asda1231sdasdasd",
            name: "Box12",
            cost: 110,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "asdasda12312sdasd",
            name: "Box13",
            cost: 10,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "asdasdasd12312asd",
            name: "Box14",
            cost: 11230,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "123123asdasdasdasd",
            name: "Box15",
            cost: 1,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
    ];
    boxesTwo = [
        {
            id: "asda3123124sdasdasd",
            name: "Box21",
            cost: 690,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "asdasdas512512dasd",
            name: "Box22",
            cost: 310,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
        {
            id: "asda512512sdasdasd",
            name: "Box23",
            cost: 160,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
    ];
    boxesThird = [
        {
            id: "asda12312546sdasdasd",
            name: "Box33",
            cost: 19,
            image: "https://sun9-58.userapi.com/impg/HKQg3Yipy_kyu6RepvfbdY39ejojg9EXWx5PJA/9GsfzFIvG3A.jpg?size=400x298&quality=96&sign=3b78a73f905d8057e155f0f8bed7bc6c&type=album"
        },
    ];

    constructor(props) {
        super(props);
        this.title = this.title + props.title;
    }

    render() {
        return (
            <div className="main">
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <ItemRoulette/>
                <Banner/>
                <div className="container-small">
                    <SearchBar/>
                    <BoxGroup name="Пушечные кейсы кс го" boxes={this.boxesOne}/>
                    <BoxGroup name="Экхтеме бархот за рубль" boxes={this.boxesTwo}/>
                    <BoxGroup name="Ну тьи панял?:" boxes={this.boxesThird}/>
                    <ReviewSlider name="Отзывы"/>
                </div>
            </div>
        );
    }
}

export default Game;