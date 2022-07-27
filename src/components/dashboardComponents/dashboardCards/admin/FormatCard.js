import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, FORMATS} from "../../../../helpers/constants";
import {Spinner} from "../../../Spinner";
import {TemplateIcon} from "@heroicons/react/solid";
import {getRowsByTable} from "../../../serviceFunctions";

export const FormatCard = () => {
    const [formatData, setFormatData] = useState(null);

    useEffect(() => {
        getRowsByTable('formats', setFormatData).then();
    }, [])

    const printFormatData = (fd) => {
        return fd.length ?
            fd.map((f) => <li key={f.id} className={'list-group-item'}>{FORMATS[f.type - 1]}</li>)
            :
            <p>Det var ingen straff!!</p>
    }

    return (
        <div className={'sms-dashboard-col'}>
            <div className={'dashboard-card'}>
                <h2><TemplateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.FORMAT}</h2>
                {
                    formatData ?
                        <>
                            <p>
                                Det finns för närvarande {formatData.length} olika typer av format att välja på. Dessa läggs in och
                                redigeras direkt i databasen på <a href={'https://supabase.com/'}>Supabase</a>.
                            </p>

                            <ul className={'list-group list-group-flush small list-unstyled'}>
                                {printFormatData(formatData)}
                            </ul>
                        </>
                        :
                        <Spinner/>
                }
            </div>
        </div>
    )
}
