import React, { useState, useRef, useEffect } from "react";
import { ArrowBottomBlack as Arrow } from "../../../../assets/images/icons";
import styles from "./group.module";
import { Converter } from "../../../../helpers/converter";

const Group = (props) => {
  const parent = useRef();
  const child = useRef();

  const [itemWidth, setItemWidth] = useState();
  const [marginLeft, setMarginLeft] = useState(0);
  const [counter, setCounter] = useState(0);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const boost = Converter.getRandomInt(3, 8);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!itemWidth) setItemWidth(getItemWidth());
      else if (props.isRolling !== undefined) {
        const isPassive = props.isRolling === false;
        const distance = (props.items.length - 10) * itemWidth;

        const remainedItems = (distance + marginLeft) / itemWidth - 2;

        if ((isPassive && remainedItems <= 0) || (!isRolling && !isPassive)) {
          setMarginLeft(0);
        } else {
          const speed = isPassive ? itemWidth / 100 : remainedItems * boost;

          if (speed <= 0.01) props.setRollingEnd(false);

          setMarginLeft(-(Math.abs(marginLeft) + speed));
        }

        setIsRolling(!isPassive);
      }
    }, 10);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.isRolling === undefined) {
        const max = maxMove(props.speed);

        setShowLeft(max !== 0 && counter !== 0);
        setShowRight(max - counter !== 0);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const clickArrow = (step) => {
    let move = counter + step;

    const max = maxMove(props.speed);
    const min = 0;

    if (move > max) move = max;
    if (move < min) move = min;

    var maxMargin = -hiddenWidth();
    var margin = move * -props.speed;

    if (margin < maxMargin) margin = maxMargin;

    setCounter(move);
    setMarginLeft(margin);
  };

  const maxMove = (speed) => Math.ceil(itemWidth / speed);
  const hiddenWidth = () => hiddenItems() * itemWidth;
  const hiddenItems = () => {
    let parentWidth =
      parent && parent.current && parent.current.offsetWidth
        ? parent.current.offsetWidth
        : 0;

    const hidden = props.items.length - Math.floor(parentWidth / itemWidth);

    return hidden > 0 ? hidden : 0;
  };
  const getItemWidth = () => {
    if (child && child.current) {
      var item = child.current.children[0];
      var style = window.getComputedStyle(item, null);
      return (
        item.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight)
      );
    } else return 0;
  };

  return props.items.length > 0 ? (
    <div className={styles.group_slider} ref={parent}>
      {showLeft ? (
        <div className={styles.button_slider} onClick={() => clickArrow(-1)}>
          <img alt="" className={styles.arrow_left} src={Arrow} />
        </div>
      ) : null}
      <div
        className={styles.inner}
        style={{
          marginLeft: marginLeft || "0",
          transition: props.isRolling !== undefined ? "none" : "all 500ms",
        }}
        ref={child}
      >
        {props.items}
      </div>
      {showRight ? (
        <div className={styles.button_slider} onClick={() => clickArrow(1)}>
          <img alt="" className={styles.arrow_right} src={Arrow} />
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Group;
