import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, FORMATS} from "../../helpers/constants";
import {supabase} from "../../supabase/supabaseClient";
import Spinner from "../Spinner";

const FormatCard = () => {
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
                alert(error.message)
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
        <div className={'col-12 col-md-4'}>
            <div className={'dashboard-card'}>
                <h2>{LABELS_AND_HEADINGS.FORMAT}</h2>
                <p>Det finns {formatData.length} olika typer av format att välja på.</p>
                <ul className={'list-group small'}>
                {printFormatData(formatData)}
                </ul>
            </div>
        </div>
    )
}

export default FormatCard;
