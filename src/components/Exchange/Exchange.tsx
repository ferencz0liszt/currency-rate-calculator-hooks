import "./Exchange.scss"
import {FC, useEffect, useState} from "react";
import NbuApi from "../../services/NbuApi";

interface props {
    date: any
}

const Exchange: FC<props> = (props) => {

    const date = props.date;
    const [rate, rateState] = useState(0);
    const [ticket, ticketState] = useState('USD');
    const [leftValue, leftState] = useState(1);



    const dateString = `${date.getFullYear()}${(date.getMonth()<10) ? "0"+date.getMonth() : date.getMonth()}${
        (date.getDate()<10) ? "0"+date.getDate() : date.getDate()}`;

    useEffect(() => {
        const nbuApi = new NbuApi();
        nbuApi
            .getRate(dateString, ticket)
            .then(rateState)
            .catch(onError);
    }, [ticket, props.date, dateString])

    const onError = (error: any) => {
        console.log(error);
    }

    const setLeft = (event: any) => {
        leftState(event.target.value);
    }


    return (
        <div className="exchange">

            <div className="buttons-wrapper">
                <div className="buttons buttons-left">
                    <div
                        className="buttons-left-uah"
                        key="UAH"
                    >UAH</div>
                </div>

                <div className="buttons buttons-right">
                    <div
                        className="buttons-right-usd"
                        key="USD"
                        onClick={() => ticketState('USD')}
                    >USD</div>
                    <div
                        className="buttons-right-eur"
                        key="EUR"
                        onClick={() => ticketState('EUR')}
                    >EUR</div>
                    <div
                        className="buttons-right-gbp"
                        key="GBP"
                        onClick={() => ticketState('GBP')}
                    >GBP</div>
                    <div
                        className="buttons-right-pln"
                        key="PLN"
                        onClick={() => ticketState('PLN')}
                    >PLN</div>
                    <div
                        className="buttons-right-arrow"
                        key="arrow"
                    >&#10614;</div>
                </div>
            </div>

            <div className="screens-wrapper">
                <div className="screen screen-left">
                    <div className="value value-left">
                        <input
                            name="left"
                            type="text"
                            placeholder="1"
                            onChange={setLeft}/>
                    </div>
                    <div className="rate rate-left">
                        1 UAH = {(1/rate).toFixed(4)} {ticket}
                    </div>
                </div>

                <div className="arrows-between">&#8644;</div>

                <div className="screen screen-right">
                    <div className="value value-right">
                        {(leftValue*rate).toFixed(2)}
                        {/*<input name="right" type="text" placeholder={(rate).toString()}/>*/}
                    </div>
                    <div className="rate rate-right">
                        1 {ticket} = {rate.toFixed(4)} UAH
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Exchange;