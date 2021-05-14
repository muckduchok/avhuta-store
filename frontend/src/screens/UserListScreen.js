import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const UserListScreen = (props) => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users} = userList;
    const userDelete = useSelector((state) => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;

    useEffect(() => {
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
    }, [dispatch, successDelete]);

    const deleteItem = (user) => {
        if (window.confirm('Вы уверены ?')) {
            dispatch(deleteUser(user._id));
        }
    };
    
    return (
        <div className="container">
        <h1>Пользователи</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && <MessageBox variant="success">Пользователь успешно удален</MessageBox>}
        {
            loading ? (<LoadingBox></LoadingBox>)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Email</th>
                    <th scope="col">Админ</th>
                    <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Да' : 'Нет'}</td>
                            <td>
                                <button type="button" className="small table-button" onClick={() => props.history.push(`/user/${user._id}/edit`)}>Изменить</button>
                                <button type="button" className="small table-button" onClick={() => deleteItem(user)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )
        }
    </div>
    );
};

export default UserListScreen;