import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import '../css/EmployeeCard.css'; // Import the CSS file for styling

const EmployeeCard = ({ employee, onRemoveClick }) => {
    const settings = {
        dots: true, // Enable dots for slider navigation
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="slider-dot"></div> // Custom dot styling
        )
    };

    return (
        <div key={employee.id} className="employee-card">
            <div className="employee-slider-wrapper">
                <Slider {...settings} className="employee-slider">
                    {employee.portfolioImages.map((image, index) => (
                        <div key={index}>
                            <img 
                                src={image} 
                                alt={`${employee.name}'s portfolio`} 
                                className="employee-image" 
                            />
                        </div>
                    ))}
                </Slider>
                <FontAwesomeIcon 
                    icon={faRemove} 
                    size="2x" 
                    className="delete-icon" 
                    onClick={() => onRemoveClick(employee.id)}
                />
            </div>
            <div className="employee-card-body">
                <div className="employee-info">
                    <h3 className="employee-name">{employee.name}</h3>
                    <h3 className="employee-experience-title">Objective</h3>
                    <p className="employee-objective">{employee.objective}</p>
                    <h3 className="employee-experience-title">Experience</h3>
                    <div className="employee-experience">
                        {employee.skills.map(skill => (
                            <div key={skill.tool} className="employee-skills">
                                <span className="employee-skill-tool">{skill.tool}</span>
                                <span className="employee-skill-years">{skill.years} years</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
