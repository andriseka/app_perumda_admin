import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { useDispatch } from 'react-redux'
import { getProduct } from '../../../models/product/product_m';
import toast from 'react-hot-toast';

const Stock = () => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getData = async(page) => {
        try {
            const response = await dispatch(getProduct(page)).unwrap().catch((err) => {});
            setProduct(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData(1);
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            return getData(page);
        }
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                       <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>DATA STOK PRODUK</h3>
                                <span>List Data Stok Produk</span>
                            </div>
                       </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr>
                                        <th className="text-center table-border-start" style={{width: '5%'}}>
                                            <span className="form-control fw-bold">
                                                No
                                            </span>
                                        </th>
                                        <th style={{width: '15%'}}>
                                            <span className="form-control">
                                                Kode Produk
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control">
                                                Nama Produk
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control">
                                                Kategori
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control">
                                                Sub Kategori
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control">
                                                Detail Sub Kategori
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control">
                                                Merk
                                            </span>
                                        </th>
                                        <th className="text-center">
                                            <span className="form-control">
                                                Unit
                                            </span>
                                        </th>
                                        <th className="text-center">
                                            <span className="form-control">
                                                Stok
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{data.no}</td>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.sub_category}</td>
                                                    <td>{data.sub_category_detail}</td>
                                                    <td>{data.merk}</td>
                                                    <td className="text-center">{data.unit}</td>
                                                    <td className="text-center">{data.stock}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default Stock
