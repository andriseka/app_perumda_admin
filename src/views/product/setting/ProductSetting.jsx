import React from 'react'
import Product from '../Product'
import { Button } from '@mui/material'

import { noimage } from '../../images/index'

const ProductSetting = () => {
    return (
        <Product>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>SETTING HARGA PRODUK</h3>
                            <span>Form Input Setting Harga Produk</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form action="">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src={ noimage } alt="" style={{width: '100%', height: '228px'}} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Pilih Produk</label>
                                        <select className="form-select">
                                            <option value="">Kopi Rojoku</option>
                                            <option value="">Atk</option>
                                            <option value="">Air Rojoku</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Harga Beli</label>
                                        <input type="text" className="form-control" defaultValue={'Rp. 1.200'} disabled />
                                    </div>
                                    <div>
                                        <label className="form-label">Harga Jual 1</label>
                                        <input type="text" className="form-control" placeholder="Harga Jual 1" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Harga Jual 2</label>
                                        <input type="text" className="form-control" placeholder="Harga Jual 2" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Harga Jual 3</label>
                                        <input type="text" className="form-control" placeholder="Harga Jual 3" />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="contained" color="primary" sx={{width: '100%'}}>
                                            Simpan Data
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Product>
    )
}

export default ProductSetting
