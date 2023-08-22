import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { BoxGroup } from "../../../components"
import { BoxGroup as BoxGroupApi } from '../../../services/api'

const BoxGroupLoader = (props) => {
		let { id } = useParams();
		const boxGroupApi = new BoxGroupApi();
		const [groups, setGroups] = useState([]);
		const [isStartBoxGroup, setIsStartBoxGroup] = useState(true);

		useEffect(() => {
      const interval = setInterval(async () => {
        try {
            const response = await boxGroupApi.getGroups(id);
						let groups = new Map();

						for(let i = 0; i < response.length; i++) {
								if(groups.has(response[i].group.name)) {
										const temp = groups.get(response[i].group.name);
										groups.set(temp.push(response[i].box));
								}
								else {
										const temp = [];
										groups.set(temp.push(response[i].box));
								}
						}
						setGroups(groups.map(([key, value]) => <BoxGroup name={key} boxes={value}/>));
						setIsStartBoxGroup(false);
        } 
        catch (err) {
					setIsStartBoxGroup(false);
        }
      }, (isStartBoxGroup ? 100 : 30000));

      return () => {
        clearInterval(interval);
      };
    });
		
		return(groups.length < 1 ? <div>{groups}</div> : null);
};

export default BoxGroupLoader;