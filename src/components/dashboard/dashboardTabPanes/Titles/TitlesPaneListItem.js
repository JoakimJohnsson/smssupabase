import React from "react";
import {Link} from "react-router-dom";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";


export const TitlesPaneListItem = ({title}) => {

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 }
    ];

    const colors = ["#41bee0", "#999"];

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

            <div className={"d-flex justify-content-center border p-2"} style={{ overflow: 'hidden'}}>

                <ResponsiveContainer width="100%" height={225}>
                    <PieChart width={200} height={200}>
                        <Pie
                            dataKey="value"
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            stroke="none"
                            label={true}
                        >
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]}/>
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </li>
    )
}
