import React from 'react';

const PayInfo = () => {
    return (
        <div className="shipping container-sm">
            <h2>Оплата</h2>

            <div className="shipping__text">
                <span className="shipping__text-er">Наличный расчет</span>
                <ul>
                    <li><span><strong>Оплата:</strong> осуществляется в офисе Гипермаркет БЕЗОПАСНОСТИ или при получении товара от курьера, выдается товарный чек и гарантийный талон.</span></li>
                </ul>
            </div>
            <div className="shipping__text">
                <span className="shipping__text-er">Безналичная оплата при оформлении заказа Visa и MasterCard</span>
                <ul>
                    <li><span>Заказ можно оплатить банковской картой Visa и MasterCard непосредственно на сайте при оформлении заказа. Данный вариант оплаты позволит сэкономить время при получении посылки.</span></li>
                    <li><span>Перед оплатой картой рекомендуем уточнить у менеджера наличие необходимого количества товара на складе</span></li>
                </ul>
            </div>
            <div className="shipping__text aftermb">
                <span className="shipping__text-er">Отправка наложенным платежом транспортной компанией Нова Пошта</span>
                <ul>
                    <li><span><strong>Оплата:</strong> осуществляется при получении товара; к оборудованию прилагается товарный чек и гарантийный талон.</span></li>
                </ul>
            </div>
        </div>
    );
};

export default PayInfo;