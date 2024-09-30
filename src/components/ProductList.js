import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/products');
            setProducts(res.data);
            setFilteredProducts(sortProducts(res.data)); // Initialize filtered products with sorted products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/categories');
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const sortProducts = (productsToSort) => {
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));//sắp xếp theo thứ tự chữ cái
    };

    const handleSearchClick = () => {
        const filtered = products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchesName && matchesCategory;
        });

        setFilteredProducts(sortProducts(filtered)); // Sort filtered products
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-4">
            <h1>Danh sách sản phẩm</h1>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2" // Add margin-end for spacing
                        placeholder="Nhập tên sản phẩm"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        style={{ width: '300px' }}
                    />
                    <select
                        className="form-select me-2" // Add margin-end for spacing
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        style={{ width: '200px' }}>
                        <option value="">Tất cả thể loại</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <button className="btn btn-success" onClick={handleSearchClick}>Tìm kiếm</button>
                </div>
                <Link to="/add" className="btn btn-primary">Thêm sản phẩm</Link>
            </div>

            {/* Show message if no products found */}
            {filteredProducts.length === 0 ? (
                <p>Không có sản phẩm nào được tìm thấy.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>STT</th> {/* Serial Number Column */}
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thể loại</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td> {/* Serial number */}
                            <td>{product.productId}</td> {/* Ensure this matches the correct field name */}
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{formatDate(product.importDate)}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;


























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [searchName, setSearchName] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//
//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, []);
//
//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get('http://localhost:3000/products');
//             setProducts(res.data);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     const fetchCategories = async () => {
//         try {
//             const res = await axios.get('http://localhost:3000/categories');
//             setCategories(res.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };
//
//     const handleSearch = () => {
//         return products.filter(product => {
//             const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
//             const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
//             return matchesName && matchesCategory;
//         });
//     };
//
//     const filteredProducts = handleSearch();
//
//     // Sort the filtered products by name
//     const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
//
//     const formatDate = (date) => {
//         const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//         return new Date(date).toLocaleDateString(undefined, options);
//     };
//
//     return (
//         <div className="container mt-4">
//             <h1>Danh sách sản phẩm</h1>
//             <div className="d-flex justify-content-between mb-3">
//                 <div className="d-flex align-items-center">
//                     <input
//                         type="text"
//                         className="form-control me-2" // Add margin-end for spacing
//                         placeholder="Nhập tên sản phẩm"
//                         value={searchName}
//                         onChange={(e) => setSearchName(e.target.value)}
//                         style={{ width: '300px' }}
//                     />
//                     <select
//                         className="form-select me-2" // Add margin-end for spacing
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         value={selectedCategory}
//                         style={{ width: '200px' }}>
//                         <option value="">Tất cả thể loại</option>
//                         {categories.map(cat => (
//                             <option key={cat.id} value={cat.name}>{cat.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <Link to="/add" className="btn btn-primary">Thêm sản phẩm</Link>
//             </div>
//
//             {/* Show message if no products found */}
//             {sortedProducts.length === 0 ? (
//                 <p>Không có sản phẩm nào được tìm thấy.</p>
//             ) : (
//                 <table className="table table-striped">
//                     <thead>
//                     <tr>
//                         <th>STT</th> {/* Serial Number Column */}
//                         <th>Mã sản phẩm</th>
//                         <th>Tên sản phẩm</th>
//                         <th>Thể loại</th>
//                         <th>Ngày nhập</th>
//                         <th>Số lượng</th>
//                         <th>Giá</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {sortedProducts.map((product, index) => (
//                         <tr key={product.id}>
//                             <td>{index + 1}</td> {/* Serial number */}
//                             <td>{product.productId}</td> {/* Ensure this matches the correct field name */}
//                             <td>{product.name}</td>
//                             <td>{product.category}</td>
//                             <td>{formatDate(product.importDate)}</td>
//                             <td>{product.quantity}</td>
//                             <td>{product.price}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };
//
// export default ProductList;