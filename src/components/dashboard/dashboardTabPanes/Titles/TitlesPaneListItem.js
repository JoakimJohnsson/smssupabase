import React, {useState, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitleProgressForUser} from "../../../../helpers/functions/functions";


export const TitlesPaneListItem = ({title}) => {

    const {user} = useAppContext();
    const [titleProgress, setTitleProgress] = useState({});
    const [progressData, setProgressData] = useState([]);

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        fetchTitleProgress().then(() => console.log("Fetched progress"));
    }, [fetchTitleProgress]);

    useEffect(() => {
        if (titleProgress) {
            setProgressData([
                {name: 'Group A', value: titleProgress.noCollectedIssues, color: "#41bee0"},
                {name: 'Group B', value: titleProgress.noMissingIssues, color: "#999"}
            ]);
        }
    }, [titleProgress]);

    const setFillColor = (color) => {
        if (titleProgress.noCollectedIssues === titleProgress.totalIssues) {
            return "#33cc99"
        } else {
            return color;
        }
    }

    return (
        <li className={"title-card"}>
            <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                  title={title.name}>
                <div className={"image-container mb-2 position-relative"}>
                    <img
                        src={title.image_url}
                        alt={title.name}
                        className="w-100"
                        loading={"lazy"}
                    />
                </div>
            </Link>
            <div className={"border p-2"}>
            <p className={"text-center mb-0"}>{titleProgress.noCollectedIssues + " / " + titleProgress.totalIssues}</p>
                <ResponsiveContainer width="100%" height={175}>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={progressData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={80}
                            stroke="none"
                            label={false}
                        >
                            {
                                progressData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={setFillColor(entry.color)}/>
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </li>
    )
}
