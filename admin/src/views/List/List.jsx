import React, { useEffect, useState } from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/Pagination';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6; // Nombre d'éléments par page
    const navigate = useNavigate();

    // Fonction pour récupérer la liste depuis l'API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.status === 'success') {
                setList(response.data.data);
            } else {
                toast.error('Error');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data');
        }
    };

    // Fonction pour supprimer un aliment
    const removeFood = async (foodId) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`${url}/api/food/remove`, {
                    data: { id: foodId },
                });
                await fetchList();
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                }
            } catch (error) {
                console.error('Error deleting food:', error);
                Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
            }
        }
    };

    // Fonction pour éditer un aliment
    const editFood = (food) => {
        navigate(`/update?id=${food._id}`);
    };

    // Effect pour charger la liste au chargement du composant
    useEffect(() => {
        fetchList();
    }, []);

    // Fonction pour changer de page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcul des éléments à afficher sur la page courante
    const indexOfLastItem = currentPage * ordersPerPage;
    const indexOfFirstItem = indexOfLastItem - ordersPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="list add flex-col">
            <div className="header d-flex justify-content-between align-items-center">
                <p className='fs-3'>All Foods List</p>
                <Pagination
                    ordersPerPage={ordersPerPage}
                    totalOrders={list.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Actions</b>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price} dh</p>
                        <button
                            onClick={() => removeFood(item._id)}
                            className="btn btn-sm btn-dark w-50 w-lg-50"
                        >
                            <i className="bi bi-trash"></i>{' '}
                        </button>
                        <button
                            onClick={() => editFood(item)}
                            className="btn btn-sm btn-warning w-50 w-lg-50"
                        >
                            <i className="bi bi-pen"></i>{' '}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
