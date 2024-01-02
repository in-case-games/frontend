import React, { useState } from "react";
import { Input } from "../../common/inputs";
import TradeUrlService from "../../../services/trade-url";
import styles from "./trade-url.module";

const TradeUrl = (props) => {
  const [error, setError] = useState(false);
  const [apply, setApply] = useState(false);

  const [url, setUrl] = useState(
    TradeUrlService.GetUrlByGame[props.game.name]() || ""
  );

  const inputUrl = (v) => {
    setUrl(v);

    if (props.game.regexTrade.test(v)) {
      setError(false);
      setApply(true);
      TradeUrlService.UpdateUrlByGame[props.game.name](v);
    } else {
      setError(true);
      setApply(false);
    }
  };

  return (
    <div className={styles.trade_url}>
      <div className={styles.trade_url_content}>
        <div className={styles.tittle}>Ссылка на обмен</div>
        <div className={styles.input}>
          <Input
            placeholder={props.game.nameTrade}
            isError={error}
            isApply={apply}
            maxLength={200}
            value={url}
            setValue={inputUrl}
            name="trade-url"
          />
        </div>
        <div className={styles.delimiter}></div>
        <a
          className={styles.support}
          target="_blank"
          rel="noopener noreferrer"
          href={props.game.urlTrade ? props.game.urlTrade : "/#"}
        >
          {props.urlTrade
            ? "Здесь можно взять ссылку - КЛИК"
            : "Обратитесь в тех. поддержку, если не знаете, где взять ссылку на обмен"}
        </a>
      </div>
    </div>
  );
};

export default TradeUrl;
