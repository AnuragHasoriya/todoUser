import React, { Component } from 'react';
import { Modal, Input, Spin } from 'antd';
import { userAction } from '../actions/userAction';
import { connect } from 'react-redux';

class EditData extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            isEdit: false,
            message: '',
            user: {
                name: '',
                email: '',
            },
            todo: {
                action: '',
                date: '',
            },
            isSpin: false
        }
    }

    componentDidUpdate(prevProps) {
        const { editData, isEdit } = this.props;
        if (!prevProps.isEdit.edit) this.setDataInState(prevProps);
    }

    setDataInState(prevProps) {
        setTimeout((prevProps) => {
            if (this.props.isEdit.edit) {
                if (this.props.editData.action) {
                    this.setState({
                        todo: {
                            key: this.props.isEdit.edit ? this.props.editData.key : '',
                            action: this.props.isEdit.edit ? this.props.editData.action : '',
                            date: this.props.isEdit.edit ? this.props.editData.date : '',
                        },
                    })

                } else {
                    this.setState({
                        user: {
                            key: this.props.isEdit.edit ? this.props.editData.key : '',
                            name: this.props.isEdit.edit ? this.props.editData.name : '',
                            email: this.props.isEdit.edit ? this.props.editData.email : '',
                        },
                    })
                }

            }
        }, 10)

    }

    showModal = () => {
        this.setState({
            isEdit: true,
        });
    };

    handleUserOk = e => {
        const { dispatch, handleEditCancel } = this.props;
        let user = this.state.user;
        this.setState({
            isSpin: true
        });
        if (user.name && user.email) {
            if (this.ValidateEmail(user.email)) {
                dispatch(userAction.updateUser(user));
                setTimeout(() => {
                    this.setState({
                        isEdit: false,
                        user: {},
                        todo: {},
                        message: ''
                    });
                    handleEditCancel();
                }, 1000)
            }
        } else {
            this.setState({
                message: 'Please enter username and email'
            })
        }
        this.setState({
            isEdit: false,
        });

    };

    handleTodoOk = (e) => {
        const { dispatch, handleEditCancel } = this.props;
        let todo = this.state.todo;
        this.setState({
            isSpin: true
        });
        if (todo.action) {
            let today = new Date();
            todo.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            dispatch(userAction.updateTodo(todo));
            setTimeout(() => {
                this.setState({
                    isEdit: false,
                    isSpin: false
                });
                handleEditCancel();
            }, 1000)
        } else {
            this.setState({
                message: 'Please enter todo task'
            })
        }
    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        this.setState({ message: 'You have entered an invalid email address!' })
        return (false)
    }

    handleUpdateData = (type, e) => {
        const { editData } = this.props;
        if (editData) {
            this.setState({
                user: editData
            })
        }
        if (type == 'action') {
            let todo = this.state.todo;
            todo[type] = e.target.value;
            this.setState({
                todo: todo
            })
        } else {
            let user = this.state.user;
            user[type] = e.target.value;
            this.setState({
                user: user
            })
        }
    }

    render() {
        const { isEdit, editData, handleEditCancel } = this.props;
        const { message, user, todo, isSpin} = this.state;

        return (
            <div>
                <Modal
                    title={isEdit.type === 'todos' ? 'Edit Todo' : 'Edit User'}
                    visible={isEdit.edit}
                    onOk={isEdit.type === 'todos' ? this.handleTodoOk : this.handleUserOk}
                    onCancel={handleEditCancel}
                >
                    {message && <div className='error-message'>{message}</div>}
                    {isEdit.type === 'todos' ?
                        <div className='user-detail'>
                            <div>
                                {isSpin ? <Spin className='loader' tip="Loading..."></Spin> :
                                    <div>
                                        <span>Update Todo</span>
                                        <Input
                                            className='input-field'
                                            name='Todo'
                                            value={todo.action}
                                            onChange={e => this.handleUpdateData('action', e)}
                                            placeholder='Enter Task'>
                                        </Input>
                                    </div>
                                }

                            </div>
                        </div> :
                        <div className='user-detail'>
                            {isSpin ? <Spin className='loader' tip="Loading..."></Spin> :
                                <div>
                                    <span>User Name</span>
                                    <Input
                                        className='input-field'
                                        name='name'
                                        value={user.name}
                                        onChange={e => this.handleUpdateData('name', e)}
                                        placeholder='Enter User'>
                                    </Input>

                                    <span>User Email</span>
                                    <Input
                                        name='email'
                                        type='email'
                                        value={user.email}
                                        onChange={e => this.handleUpdateData('email', e)}
                                        placeholder='Enter Email'>
                                    </Input>
                                </div>
                            }

                        </div>}
                </Modal>
            </div>
        );
    }
}
export default connect()(EditData);