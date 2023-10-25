import React, { useEffect, useState } from "react";
import LazyLoading from "./lazy-loading";
import { Counter as Slider } from "../../components/common/sliders";
import styles from "./inventory.module";

const Inventory = (props) => {
  const [currentFilter, setCurrentFilter] = useState(props.filterName);

  const [isClickSlider, setIsClickSlider] = useState(false);

  const [primaryInventory, setPrimaryInventory] = useState([]);
  const [loadedInventory, setLoadedInventory] = useState([]);
  const [showInventory, setShowInventory] = useState(null);

  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const sliderClick = (step) => {
    const p = page + step;
    const isAllowed = !props.isLoading && !isClickSlider;

    if (p >= 1 && p <= pages && isAllowed) {
      setIsClickSlider(true);
      setPage(p);
      props.setIsLoading(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => props.setIsLoading(true), 10000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        async function loadInventory(isAllReload) {
          let primary = primaryInventory;
          let pages = pages;

          if (isAllReload) {
            primary = await props.loadPrimary();

            pages = Math.ceil(primary.length / 20);
            pages = pages === 0 ? 1 : pages;

            setPrimaryInventory(primary);
            setPages(pages);

            if (page > pages) setPage(pages);
          }

          if (props.filter) primary = props.filter(primary);

          await LazyLoading({
            isAllReload: isAllReload,
            primary: primary,
            loaded: loadedInventory,
            page: page > pages ? pages : page,
            setLoaded: setLoadedInventory,
            setShow: setShowInventory,
            additionalLoading: props.additionalLoading,
            createShowByLoaded: props.createShowByLoaded,
            backAll: () => setPage(page <= 2 ? 1 : page - 1),
          });
        }

        if (props.isLoading && isClickSlider) {
          loadInventory(false);

          props.setIsLoading(false);
          setIsClickSlider(false);
        } else if (props.isLoading && !isClickSlider) {
          loadInventory(true);

          props.setIsLoading(false);
        } else if (
          !props.isLoading &&
          !isClickSlider &&
          currentFilter !== props.filterName
        ) {
          setCurrentFilter(props.filterName);
          setPage(1);
          setLoadedInventory([]);

          props.setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.inventory}>
      <div className={styles.content}>{showInventory}</div>
      <div className={styles.slider}>
        <Slider page={page} pages={pages} click={sliderClick} />
      </div>
    </div>
  );
};

export default Inventory;
