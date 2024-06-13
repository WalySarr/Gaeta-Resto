import React from 'react';
import './Pagination.css';

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (event, number) => {
        // event.preventDefault();
        paginate(number);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${currentPage === number ? 'active' : ''}`}
                    >
                        <a
                            href="#"
                            onClick={(event) => handleClick(event, number)}
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
