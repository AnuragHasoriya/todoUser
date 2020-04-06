import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Button, Table, Divider, Modal, Input, Spin } from 'antd';
import 'antd/dist/antd.css';
import './todos.css';
import { userAction } from '../actions/userAction';

class CreateUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            user: {
                name: '',
                email: ''
            },
            todo: {
                action: '',
                date: ''
            },
            isSpin: false
        }
    }

    showModal = () => {
        console.log("open")
        this.setState({
            visible: true,
        });
    };

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        this.setState({ message: 'You have entered an invalid email address!' })
        return (false)
    }

    handleUserOk = e => {
        const { dispatch } = this.props;
        let user = this.state.user;

        if (user.name && user.email) {
            if (this.ValidateEmail(user.email)) {
                this.setState({
                    isSpin: true
                });
                dispatch(userAction.createUser(user));
                setTimeout(() => {
                    this.setState({
                        visible: false,
                        user: {},
                        todo: {},
                        message: '',
                        isSpin: false
                    });
                }, 1000)

            }
        } else {
            this.setState({
                message: 'Please enter username and email'
            })
        }
        // this.setState({
        //     visible: false,
        // });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            user: {},
            todo: {},
            message: '',
        });
    };

    // updateUserDetail = (key, type) => {
    //     console.log(key, type)
    //     console.log(this.props) 
    // }
    handleInputData = (type, e) => {
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

    handleTodoOk = (e) => {
        const { dispatch } = this.props;
        let todo = this.state.todo;

        if (todo.action) {
            let today = new Date();
            todo.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            this.setState({
                isSpin: true
            });
            dispatch(userAction.addTodo(todo));
            setTimeout(() => {
                this.setState({
                    visible: false,
                    user: {},
                    todo: {},
                    message: '',
                    isSpin: false
                });
            }, 1000)

        } else {
            this.setState({
                message: 'Please enter todo task'
            })
        }
    }

    render() {
        const { message, user, todo, isSpin } = this.state
        const { data, columns, tabpane } = this.props;
        return (
            <div>
            <Button onClick={this.showModal}>{tabpane ? 'Add Todo' : 'Create User'}</Button>
                <div className= 'table-data'>
                   
                    <div>
                        <Modal
                            title={tabpane ? 'Add Todo' : 'Create User'}
                            visible={this.state.visible}
                            onOk={tabpane ? this.handleTodoOk : this.handleUserOk}
                            onCancel={this.handleCancel}

                        >
                            {message && <div className='error-message'>{message}</div>}
                            {tabpane ?
                                <div className='user-detail'>
                                    <div>
                                        {isSpin ? <Spin className='loader' tip="Loading..."></Spin> :
                                            <div>
                                                <span>Add Action</span>
                                                <Input
                                                    className='input-field'
                                                    name='Todo'
                                                    value={todo.action}
                                                    onChange={e => this.handleInputData('action', e)}
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
                                                onChange={e => this.handleInputData('name', e)}
                                                placeholder='Enter User'>
                                            </Input>

                                            <span>User Email</span>
                                            <Input
                                                name='email'
                                                type='email'
                                                value={user.email}
                                                onChange={e => this.handleInputData('email', e)}
                                                placeholder='Enter Email'>
                                            </Input>
                                        </div>
                                    }

                                </div>
                            }
                        </Modal>
                        <Table dataSource={data} columns={columns} rowKey={data.id} bordered></Table>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null)(CreateUserModal);
