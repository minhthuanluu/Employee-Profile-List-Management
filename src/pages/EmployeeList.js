import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/EmployeeList.css';
import EmployeeCard from '../components/EmployeeCard';
import ConfirmationModal from '../components/ConfirmationModal';
import '../css/Searchbar.css'; // Import the CSS file for styling
import '../css/LoadingSpinner.css'; // Import the CSS file for spinner

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [employeeToRemove, setEmployeeToRemove] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                // Use a relative path if `db.json` is in the public directory
                const response = await axios.get('https://minhthuanluu.github.io/employee-profile-list-management/db.json');
                setEmployees(response.data);
            } catch (error) {
                setError(`Error loading employee data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const calculateTotalExperience = (skills) => {
        return skills?.reduce((total, skill) => total + skill?.years, 0);
    };

    const sortedEmployees = employees?.sort((a, b) => {
        const totalExperienceA = calculateTotalExperience(a.skills);
        const totalExperienceB = calculateTotalExperience(b.skills);
        return totalExperienceB - totalExperienceA;
    });

    const filteredEmployees = sortedEmployees?.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRemoveClick = (id) => {
        setEmployeeToRemove(id);
        setModalVisible(true);
    };

    const handleConfirmRemove = () => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeToRemove));
        setModalVisible(false);
        setEmployeeToRemove(null);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setEmployeeToRemove(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <h1 className="page-title">List Employee</h1>
            <div className="search-bar-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Type to search by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                filteredEmployees?.length === 0 ? (
                    <p className="no-data-message">Data not found</p>
                ) : (
                    <div className="employee-grid-container">
                        {
                            filteredEmployees?.map(employee => (
                                <EmployeeCard
                                    key={employee.id}
                                    employee={employee}
                                    onRemoveClick={() => handleRemoveClick(employee.id)}
                                />
                            ))
                        }
                    </div>
                )

            )}
            <ConfirmationModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                onConfirm={handleConfirmRemove}
            />
        </div>
    );
};

export default EmployeeList;
