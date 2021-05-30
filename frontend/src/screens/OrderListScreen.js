import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/order';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstans';

const OrderListScreen = (props) => {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;
    const dispatch = useDispatch();
    const orderDelete = useSelector((state) => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const deleteItem = (order) => {
        if (window.confirm('Вы уверены ?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div className="container">
        <h1>Заказы</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? <LoadingBox></LoadingBox> : 
        error ? <MessageBox variant="danget">{error}</MessageBox> 
        : (
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Заказ</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Сумма</th>
                    <th scope="col">Оплачено</th>
                    <th scope="col">Разное</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.shippingAddress.fullName}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.itemsPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 'Нет'}</td>
                            <td>
                                <button type="button" className="small table-button" onClick={() => {props.history.push(`/order/${order._id}`)}}>Детали</button>
                                <button type="button" className="small table-button" onClick={() => deleteItem(order)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    );
};

export default OrderListScreen;