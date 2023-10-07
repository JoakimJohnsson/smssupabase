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
                {name: 'A', value: titleProgress.noCollectedIssues, color: "#41bee0"},
                {name: 'B', value: titleProgress.noMissingIssues, color: "#999"}
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
            <p className={"text-center mb-0"}>{titleProgress.progress + "%"}</p>
                <ResponsiveContainer width="100%" height={175}>
                    <PieChart>
                        <defs>
                            <pattern id="pattern-A" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                <rect width="2" height="4" fill="#41bee0" />
                            </pattern>
                            <pattern id="pattern-B" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                <rect width="1" height="6" fill="#999" />
                            </pattern>
                        </defs>
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
                                    <Cell key={`cell-${index}`} fill={setFillColor(`url(#pattern-${entry.name})`)}/>
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </li>
    )
}
