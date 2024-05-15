/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.status === 'success') {
            setList(response.data.data);
        } else {
            toast.error('Error');
        }
    };
    const removeFood = async (foodId) => {
        // Afficher une boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
        });

        // Si l'utilisateur confirme la suppression
        if (result.isConfirmed) {
            try {
                // Supprimer l'élément
                const response = await axios.delete(`${url}/api/food/remove`, {
                    data: { id: foodId },
                });
                // Actualiser la liste
                await fetchList();
                // Afficher une boîte de dialogue de succès
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                }
            } catch (error) {
                // En cas d'erreur, afficher une boîte de dialogue d'erreur
                Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
            }
        }
    };
    const editFood = (food) => {
        // Rediriger vers la page d'édition avec les informations de l'aliment
        navigate(`/update?id=${food._id}`);
    };

    useEffect(() => {
        fetchList();
    }, []);
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Actions</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt="" />
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
                    );
                })}
            </div>
        </div>
    );
};

export default List;
