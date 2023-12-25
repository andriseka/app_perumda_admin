import React, { useEffect, useState } from 'react'
import Product from '../Product'
import { useDispatch } from 'react-redux'
import { getProduct } from '../../../models/product/product_m';
import toast from 'react-hot-toast';
import { Backdrop, Box, Button, Fade, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

import { NumericFormat } from 'react-number-format';
import SalesModalSettingPrice from '../../sales/data/SalesModalSettingPrice';

import Paginate from '../../pagination/Paginate'

const ProductData = () => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState([]);
    const [pagination, setPagination] = useState([]);

    // modal
    const [open, setOpen] = useState(false);
    const [setting, setSetting] = useState({
        code: '', name: ''
    });
  

    const getDataProduct = async(page) => {
        try {
            const response = await dispatch(getProduct(page)).unwrap().catch((err) => {});
            setProduct(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataProduct(1);
    }, [])

    const handlePagination = (_, page) => {
        return getDataProduct(page);
    }

    const ondetail = (code) => {
        return window.location.href = `data/${code}`
    }

    const onsetting = (code_product) => {
        setOpen(true)
        product.some(element => {
            if (element.code === code_product) {
                setSetting({
                    code: element.code,
                    name: element.name,
                    harga_beli: element.harga_beli
                })
            }
        })
       
    }  
    
    const handleCloseModal = () => {
        setOpen(false);
        setSetting([]);
    }

    return (
        <Product>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3 text-center">
                            <h3>
                                DATA PRODUK PERUMDA ANEKA USAHA <br />
                                KABUPATEN JEPARA
                            </h3>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-md-2 mb-3">
                                <label className="form-label form-label-m-0">Kategori</label>
                                <Select
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem>Perusahaan</MenuItem>
                                    <MenuItem>Perorangan</MenuItem>
                                </Select>
                            </div>

                            <div className="col-md-2 mb-3">
                                <label htmlFor="" className="form-label form-label-m-0">Sub Kategori</label>
                                <Select
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem>Kopi</MenuItem>
                                    <MenuItem>ATK</MenuItem>
                                    <MenuItem>Air</MenuItem>
                                </Select>
                            </div>

                            <div className="col-md-2 mb-3">
                                <label htmlFor="" className="form-label form-label-m-0">Detail Sub Kategori</label>
                                <Select
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem>Kopi</MenuItem>
                                    <MenuItem>ATK</MenuItem>
                                    <MenuItem>Air</MenuItem>
                                </Select>
                            </div>

                            <div className="col-md-5 mb-3">
                                <label className="form-label form-label-m-0">Cari Nama Produk</label>
                                <TextField 
                                    size="small"
                                    fullWidth
                                    placeholder="Cari Nama Produk"
                                />
                            </div>

                            <div className="col-md-1 mb-3">
                                <Button fullWidth variant="contained">
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="table-border-start">
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nama Produk</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Sub Kategori</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Harga Beli</span>
                                        </th>
                                        <th style={{width: '15%'}} className="text-center table-border-end">
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{ data.no }</td>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.sub_category}</td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.harga_beli } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button onClick={() => onsetting(data.code)} variant="contained" color="primary" size="small" sx={{mr: 1}}>
                                                                Setting
                                                            </Button>
                                                            <Button onClick={() => ondetail(data.code)} variant="contained" color="success" size="small" sx={{mr: 1}}>
                                                                Detail
                                                            </Button>
                                                            <Button variant="contained" color="error" size="small">
                                                                Delete
                                                            </Button>
                                                        </div> 
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span>Halaman : { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>

                            {
                                pagination.pagination ? 
                                <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} />  : ''
                            }

                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Produk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            {
                open ? <SalesModalSettingPrice open={open} onClose={handleCloseModal} setting={setting} /> : ''
            }
        </Product>
    )
}

export default ProductData
