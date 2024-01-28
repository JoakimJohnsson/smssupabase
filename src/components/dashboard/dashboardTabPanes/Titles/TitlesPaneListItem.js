import React, {useState, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitleProgressForUser} from "../../../../helpers/functions";
import {FormatBadge} from "../../../minis/FormatBadge";


export const TitlesPaneListItem = ({title}) => {

    const {user} = useAppContext();
    const [titleProgress, setTitleProgress] = useState({});
    const [progressData, setProgressData] = useState([]);
    const [completed, setCompleted] = useState(false);

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        fetchTitleProgress().then();
    }, [fetchTitleProgress]);

    useEffect(() => {
        if (titleProgress) {
            setProgressData([
                {name: 'A', value: titleProgress.noCollectedIssues, color: "#ffd700"},
                {name: 'B', value: titleProgress.noMissingIssues, color: "#999"}
            ]);
            setCompleted((titleProgress.noCollectedIssues === titleProgress.totalIssues));
        }
    }, [titleProgress]);


    const setFillColor = (color) => {
        if (completed) {
            return "#33cc99"
        } else {
            return color;
        }
    }

    return (
        <li className={"title-card"}>
            <div className={"bg-horse"}>
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
                <div className={"px-2 border-bottom"}>
                    <span className={`tag-badge text-black mb-1 ${completed ? "bg-success" : "bg-grade"}`}>{titleProgress.progress + "%"}</span>
                    <FormatBadge formatId={title.format_id} customClass={"mb-1"} year={title.start_year}/>
                </div>
                <div className={"p-2"}>
                    <ResponsiveContainer width="100%" height={175}>
                        <PieChart>
                            <defs>
                                <pattern id="pattern-A" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                    <rect width="2" height="4" fill="#ffd700"/>
                                </pattern>
                                <pattern id="pattern-B" width="1" height="1" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                    <rect width="1" height="1" fill="#141a1b"/>
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
            </div>
        </li>
    )
}
