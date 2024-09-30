import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/categories');
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const validationSchema = Yup.object({
        productId: Yup.string()
            .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải đúng định dạng PROD-XXXX')
            .required('Mã sản phẩm là bắt buộc'),
        name: Yup.string()
            .max(100, 'Tên sản phẩm không được dài quá 100 ký tự')
            .required('Tên sản phẩm là bắt buộc'),
        category: Yup.string()
            .required('Thể loại là bắt buộc'),
        importDate: Yup.date()
            .max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại')
            .required('Ngày nhập là bắt buộc'),
        quantity: Yup.number()
            .positive('Số lượng phải lớn hơn 0')
            .integer('Số lượng phải là số nguyên')
            .required('Số lượng là bắt buộc'),
        price: Yup.number()
            .positive('Giá phải lớn hơn 0')
            .required('Giá là bắt buộc'),
        description: Yup.string()
            .max(500, 'Mô tả không được dài quá 500 ký tự'),
    });

    return (
        <div className="container mt-4">
            <h2>Thêm Sản Phẩm</h2>
            <Formik
                initialValues={{
                    productId: '',
                    name: '',
                    category: '',
                    importDate: '',
                    quantity: '',
                    price: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    try {
                        await axios.post('http://localhost:3000/products', values);
                        alert('Sản phẩm đã được thêm thành công!');
                        navigate('/'); // Chuyển hướng về danh sách sản phẩm
                    } catch (error) {
                        console.error('Error adding product:', error);
                    }
                }}
            >
                {() => (
                    <Form>
                        <div className="mb-3">
                            <Field
                                type="text"
                                name="productId"
                                className="form-control"
                                placeholder="Mã sản phẩm (ví dụ: PROD-XXXX)"
                            />
                            <ErrorMessage name="productId" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Tên sản phẩm"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field as="select" name="category" className="form-select">
                                <option value="">Chọn thể loại</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field
                                type="date"
                                name="importDate"
                                className="form-control"
                            />
                            <ErrorMessage name="importDate" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field
                                type="number"
                                name="quantity"
                                className="form-control"
                                placeholder="Số lượng"
                            />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="Giá"
                            />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <Field
                                as="textarea"
                                name="description"
                                className="form-control"
                                placeholder="Mô tả"
                                rows="3"
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Thêm Sản Phẩm</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;
