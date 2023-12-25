import React from 'react'
import Moment from 'react-moment'

import { NumericFormat } from 'react-number-format'

const PurchaseTempoTable = ({ tempo }) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-border-start" style={{width: '5%'}}>
                                <span className="form-control">No</span>
                            </th>
                            <th>
                                <span className="form-control">
                                    Tanggal Tempo
                                </span>
                            </th>
                            <th>
                                <span className="form-control">
                                    Nominal
                                </span>
                            </th>
                            <th>
                                <span className="form-control">
                                    Terbayar
                                </span>
                            </th>
                            <th className="table-border-end">
                                <span className="form-control">
                                    Status
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempo.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>
                                            <Moment format="dddd, DD MMMM YYYY">{data.date}</Moment>
                                        </td>
                                        <td>
                                            <NumericFormat 
                                                value={ data.nominal } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </td>
                                        <td>
                                            <NumericFormat 
                                                value={ data.terbayar } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </td>
                                        <td>
                                            { data.nominal !== data.terbayar ? 'Belum Terbayar' : 'Terbayar' }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PurchaseTempoTable
