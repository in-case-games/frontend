import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box as BoxApi, Game as GameApi } from "../../../api";
import { Boxes as Group } from "../../../components/structure";
import styles from "../game.module";

const Loader = () => {
  const boxApi = new BoxApi();
  const gameApi = new GameApi();

  let { name } = useParams();
  const [groups, setGroups] = useState([]);
  const [isStart, setIsStart] = useState(true);
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    const interval = setInterval(() => {
      if (url !== window.location.href) {
        setUrl(window.location.href);
        setIsStart(true);
      }
    }, 100);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(
      async () => {
        setIsStart(false);
        const game = await gameApi.getByName(name);
        const response = await boxApi.getGroupsByGameId(game.id);

        let groups = {};

        for (let i = 0; i < response.length; i++) {
          const name = response[i].group.name;
          const box = await boxApi.pushImage(response[i].box);

          let temp = [];

          if (groups[name] !== undefined) temp = groups[name];

          temp.push(box);
          groups[name] = temp;
        }

        const keys = Object.keys(groups);
        setGroups(
          keys.map((k) => <Group name={k} boxes={groups[k]} key={k} />)
        );
      },
      isStart ? 100 : 30000
    );

    return () => clearInterval(interval);
  });

  return <div className={styles.box_groups}>{groups}</div>;
};

export default Loader;
