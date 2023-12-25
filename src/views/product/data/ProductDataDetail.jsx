import React, { useEffect, useState } from 'react'
import Product from '../Product'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailProduct } from '../../../models/product/product_m';
import { ReplyAll } from '@mui/icons-material';
import { TextField } from '@mui/material';

import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import moment from 'moment';


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


const ProductDataDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, code } = useParams();

    const [product, setProduct] = useState([]);

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailProduct(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                setProduct(response.data);
            } else {
                return window.location.href = `/${username}/product/data`
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const handleBack = () => {
        return navigate(-1)
    }

    const date = moment(product.date_opname_last).format('dddd, DD MMMM YYYY');

    return (
        <Product> 
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>{ product.name ? product.name : '' }</h3>
                                <span>Detail Data Produk</span>
                            </div>
                            <div>
                                <span onClick={handleBack} className="px-1 py-2 rounded-circle" style={{backgroundColor: 'orange', cursor: 'pointer'}}>
                                    <ReplyAll  sx={{color: '#ffffff'}} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form action="">
                    <div className="row row-deck">
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src={ product.image ? product.image: '' } alt="" style={{width: '100%', height: '260px', borderRadius: '4px'}} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Kode Produk</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.code ? product.code : ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nama Produk</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.name ? product.name : ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Kategori</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.category ? product.category : ''}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label form-label-m-0">Sub Kategori</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.sub_category ? product.sub_category : ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Detail Sub kategori</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.sub_category_detail ? product.sub_category_detail : 'Kosong'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Merk</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.merk ? product.merk : ''}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Unit</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.unit ? product.unit : ''}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label form-label-m-0">Min. Stok</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.stock_min ? product.stock_min : ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Stok</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={ product.stock ? product.stock : 0}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Harga Beli</label>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={ product.harga_beli ? product.harga_beli : 0 } 
                                            placeholder="Rp. "
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                            }}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Tgl. Terakhir Opname</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={date}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label form-label-m-0">Wkt. Terakhir Opname</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={product.time_opname_last ? product.time_opname_last : ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <label className="form-label form-label-m-0">Deskripsi</label>
                                    <textarea style={{height: '150px'}} className="form-control" defaultValue={product.desc ? product.desc: ''}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <label className="form-label form-label-m-0">Informasi Tambahan</label>
                                    <textarea style={{height: '150px'}} className="form-control" defaultValue={product.info ? product.info: ''}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Product>
    )
}

export default ProductDataDetail
