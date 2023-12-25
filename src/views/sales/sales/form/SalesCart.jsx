import { Close } from '@mui/icons-material';
import { Backdrop, Box, Button, Fade, Modal, TextField } from '@mui/material'
import React from 'react'

import { NumericFormat } from 'react-number-format';

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    outline: 0,
};

const SalesCart = (props) => {
    const listArray  = props.lists
    const setting_price = props.setting_price;

    return (
        <Modal
            open={props.open}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.open}>
                <Box style={style}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h3>Keranjang</h3>
                                    </div>
                                    <div onClick={props.onClose} style={{cursor: 'pointer'}}>
                                        <Close sx={{color: '#d63939'}} />
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th className="table-border-start">
                                                    <span className="form-control">Kode Produk</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Nama Produk</span>
                                                </th>
                                                <th style={{width: '10%'}}>
                                                    <span className="form-control">Jumlah</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Harga Satuan</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Sub Total</span>
                                                </th>
                                                <th className="table-border-end text-center" style={{width: '8%'}}>
                                                    <span className="form-control">Action</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                listArray.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.code}</td>
                                                        <td>{data.name}</td>
                                                        <td>
                                                            <TextField 
                                                                size="small"
                                                                fullWidth
                                                                defaultValue={data.qty}
                                                                type="number"
                                                                onChange={(e) => props.onUpdateQty(e, data.code)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <NumericFormat 
                                                                value={
                                                                    setting_price === 'harga_1' ? data.harga_1 :
                                                                    setting_price === 'harga_2' ? data.harga_2 :
                                                                    setting_price === 'harga_3' ? data.harga_3 :
                                                                    setting_price === 'harga_4' ? data.harga_4 : ''
                                                                } 
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
                                                                value={
                                                                    setting_price === 'harga_1' ? data.harga_1 * data.qty :
                                                                    setting_price === 'harga_2' ? data.harga_2 * data.qty :
                                                                    setting_price === 'harga_3' ? data.harga_3 * data.qty :
                                                                    setting_price === 'harga_4' ? data.harga_4 * data.qty : ''
                                                                } 
                                                                allowLeadingZeros 
                                                                thousandSeparator="," 
                                                                valueIsNumericString
                                                                prefix="Rp. "
                                                                displayType="text"
                                                                renderText={(value) => <span>{value}</span>}
                                                            /> 
                                                        </td>
                                                        <td className="text-center">
                                                            <button onClick={() => props.onCancelCart(index)} className="btn btn-danger btn-sm">Cancel</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            <tr>
                                                <th colSpan={3}>
                                                    PPN
                                                </th>
                                                <th>
                                                    <select defaultValue={props.ppn} className="form-select" onChange={props.handleChangePpn}>
                                                        <option value="non">NON PPN</option>
                                                        <option value="ppn">PPN</option>
                                                    </select>
                                                </th>
                                                <th>
                                                    <NumericFormat 
                                                        value={ props.ppn_price }
                                                        allowLeadingZeros 
                                                        thousandSeparator="," 
                                                        valueIsNumericString
                                                        prefix="Rp. "
                                                        displayType="text"
                                                        renderText={(value) => <span>{value}</span>}
                                                    /> 
                                                </th>
                                            </tr>

                                            <tr>
                                                <th colSpan={3}>
                                                    Total Pembayaran
                                                </th>
                                                <th colSpan={2}>
                                                    <NumericFormat 
                                                        value={props.total_pembayaran}
                                                        allowLeadingZeros 
                                                        thousandSeparator="," 
                                                        valueIsNumericString
                                                        prefix="Rp. "
                                                        displayType="text"
                                                        renderText={(value) => <span>{value}</span>}
                                                    /> 
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default SalesCart
