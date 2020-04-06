import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Divider, Input, InputNumber, Popconfirm, Form, Spin } from 'antd';
import 'antd/dist/antd.css';
import './todos.css';
import { userAction } from '../actions/userAction';
import CreateUserModal from './createUserModal';
import EditData from './editData'
const { TabPane } = Tabs;




class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: true,
            editData: {},
            isEdit: { edit: false, type: ''},
            userColumns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) =>
                        <span>
                            <a onClick={() => this.updateUserDetail(record, 'users')}>Edit</a>
                            <Divider type='vertical'></Divider>
                            {this.props.todos.length >= 1 ? (
                                <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() => this.removeDataFromLocalStorage(record.key, 'users')}>
                                    <a>Delete</a>
                                </Popconfirm>
                            ) : null}
                        </span>

                }
            ],
            todoColumns: [
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',

                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) =>
                        <span>
                        <a onClick={() => this.updateUserDetail(record, 'todos')}>Edit</a>
                            <Divider type='vertical'></Divider>
                            {this.props.todos.length >= 1 ? (
                                <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() => this.removeDataFromLocalStorage(record.key, 'todos')}>
                                    <a>Delete</a>
                                </Popconfirm>
                            ) : null}
                        </span>

                }
            ],
            user: {
                username: '',
                email: ''
            },
            visible: false,

        }
    }

    removeDataFromLocalStorage = (key, type) => {
        const { dispatch } = this.props;
        dispatch(userAction.RemoveDataFromLocalStorage(key, type));
    }

    updateUserDetail = (record, type) => {
        this.setState({
            editData: record,
            isEdit: {edit: true, type: type},
        })
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(userAction.getAllUser());
        dispatch(userAction.getAllTodos());
    }

    handleEditCancel = e => {
        console.log(e);
        this.setState({
            isEdit: { edit: false, type: ''},
            user: {},
            todo: {},
            message: ''
        });
    };

    render() {
        const { users, todos } = this.props;
        const { todoColumns, userColumns, message, isEdit, editData } = this.state;
        return (
            <div >
                <EditData
                    editData={editData}
                    isEdit={isEdit}
                    handleEditCancel={this.handleEditCancel}
                />
                <h1>TODO'S</h1>
                <div className='tabs-view'>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Todos" key="1">
                            <CreateUserModal tabpane={true} data={todos && todos} columns={todoColumns}></CreateUserModal>
                        </TabPane>
                        <TabPane tab="Users" key="2">
                            <CreateUserModal
                                data={users && users}
                                columns={userColumns}
                            >
                            </CreateUserModal>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users, todos } = state.userStore;
    return {
        users, todos
    };
}

export default connect(mapStateToProps)(Todo);
