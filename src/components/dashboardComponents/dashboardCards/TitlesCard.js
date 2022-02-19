import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, FORMATS} from "../../../helpers/constants";
import {supabase} from "../../../supabase/supabaseClient";
import Spinner from "../../Spinner";

export const TitlesCard = () => {
    const [loading, setLoading] = useState(true);
    const [formatData, setFormatData] = useState(null);

    useEffect(() => {
        async function getFormats() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('formats')
                    .select('*')
                if (error && status !== 406) {
                    console.log('Error: ', error);
                }
                if (data) {
                    setFormatData(data)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getFormats().then(() => 'Do something')
    }, [])

    const printFormatData = (fd) => {
        return fd.map( (f) =>
            <li key={f.id} className={'list-group-item'}>{FORMATS[f.type - 1]}</li>)
    }

    return loading ? (<Spinner/>) : (
        <div className={'col-12 col-md-6 col-xl-4 main-col'}>
            <div className={'dashboard-card'}>
                <h2>{LABELS_AND_HEADINGS.FORMAT}</h2>
                <p>Det finns för närvarande {formatData.length} olika typer av format att välja på. Dessa läggs in och
                    redigeras direkt i databasen på <a href={'https://supabase.com/'}>Supabase</a>.</p>
                <ul className={'list-group list-group-flush small'}>
                {printFormatData(formatData)}
                </ul>
            </div>
        </div>
    )
}
