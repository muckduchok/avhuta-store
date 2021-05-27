import React from 'react';

const ContactsInfo = () => {
    return (
        <div className="container-sm">
            <h2>Контакты</h2>
        <div className="contactss">
            <div className="contactss__div">
                <div className="contactss__div-city">
                    <div className="city-icon">
                        <i className="bi bi-geo-alt"></i>
                    </div>
                    <p>Украина, г.Сумы</p>
                </div>
                <div className="contactss__div-phone">
                    <div className="city-icon">
                        <i className="bi bi-phone"></i>
                    </div>
                    <p>+380668173846</p>
                </div>
                <div className="contactss__div-email">
                    <div className="city-icon">
                        <i className="bi bi-envelope"></i>
                    </div>
                    <p>anton.avhutskiy@gmail.com</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ContactsInfo;