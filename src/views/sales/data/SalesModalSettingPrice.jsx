import { Close } from '@mui/icons-material';
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProductPrice } from '../../../models/product/product_m';
import toast from 'react-hot-toast';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="Rp. "
        />
    );
});

NumericFormatCustom.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const SalesModalSettingPrice = (props) => {
    const dispatch = useDispatch();

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

    const setting = props.setting;

    // input data
    const [input, setInput] = useState({
        code: setting.code, harga_1: '', harga_2: '', harga_3: '', harga_4: ''
    })

    // submit
    const onSubmit = async(e) => {
        e.preventDefault()
        const data = {...input}

        try {
            const response = await dispatch(updateProductPrice(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Data berhasil diperbaharui');
                setTimeout(() => {
                   window.location.reload(); 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

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
                <Box sx={style}>
                    <form onSubmit={onSubmit}>
                        <div className="modal-dialog modal-md modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h3>Setting Harga Produk</h3>
                                        </div>
                                        <div onClick={props.onClose} style={{cursor: 'pointer'}}>
                                            <Close sx={{color: '#d63939'}} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Kode Produk</label>
                                            <TextField 
                                                size="small"
                                                fullWidth
                                                placeholder="Auto"
                                                disabled
                                                value={setting.code}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Nama Produk</label>
                                            <TextField 
                                                size="small"
                                                fullWidth
                                                placeholder="Auto"
                                                disabled
                                                value={setting.name}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <label className="form-label form-label-m-0">Harga Beli</label>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={ setting.harga_beli }   
                                                placeholder="Rp. "
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom,
                                                }}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Harga Jual 1</label>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={ input.harga_1 }   
                                                placeholder="Rp. "
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom,
                                                }}
                                                onChange={(e) => setInput({...input, harga_1: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Harga Jual 2</label>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={ input.harga_2 }   
                                                placeholder="Rp. "
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom,
                                                }}
                                                onChange={(e) => setInput({...input, harga_2: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Harga Jual 3</label>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={ input.harga_3 }   
                                                placeholder="Rp. "
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom,
                                                }}
                                                required
                                                onChange={(e) => setInput({...input, harga_3: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label form-label-m-0">Harga Jual 4</label>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={ input.harga_4 }   
                                                placeholder="Rp. "
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom,
                                                }}
                                                onChange={(e) => setInput({...input, harga_4: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button disabled={ setting.harga_beli === 0 ? true : false } variant="contained" color="primary" type="submit">
                                        Perbaharui
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default SalesModalSettingPrice
