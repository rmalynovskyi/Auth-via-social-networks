import React, {useContext, useEffect, useState} from 'react'
import {Context} from "./index";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {selectFilter} from 'react-bootstrap-table2-filter';
import Toolbar from "./Toolbar";
import firebase from "./configs/firebase-config";

const Table = () => {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    const getAllUsers = () => {
        const data = [];
        let user;
        let database = firebase.database().ref('users/');
        database.on("value", async snapshot => {
            snapshot.forEach(childSnapShot => {
                user = {
                    uid: childSnapShot.val().uid,
                    name: childSnapShot.val().name,
                    socialNetwork: childSnapShot.val().socialNetwork.substring(0, childSnapShot.val().socialNetwork.lastIndexOf('.')),
                    firstLogin: new Date(Date.parse(childSnapShot.val().firstLogin)).toLocaleDateString(),
                    lastLogin: new Date(Date.parse(childSnapShot.val().lastLogin)).toLocaleDateString(),
                    status: childSnapShot.val().status,
                };
                data.push(user);
            });
        });
        return data;
    }

    const {auth} = useContext(Context);

    useEffect(() => {
        setUsers(getAllUsers());
    }, []);

    const selectOptionsStatus = {
        "blocked": "blocked",
        "active": "active"
    };

    const selectOptionsSocialNetwork = {
        "facebook": "facebook",
        "twitter": "twitter",
        "github": "github"
    };

    const columns = [
        {
            dataField: "uid",
            text: "Unique ID",
            sort: true,
        },
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "socialNetwork",
            text: "Social Network",
            sort: true,
            formatter: cell => selectOptionsSocialNetwork[cell],
            filter: selectFilter({
                options: selectOptionsSocialNetwork
            })
        },
        {
            dataField: "firstLogin",
            text: "First login date",
            sort: true
        },
        {
            dataField: "lastLogin",
            text: "Last login date",
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            formatter: cell => selectOptionsStatus[cell],
            filter: selectFilter({
                options: selectOptionsStatus
            })
        }
    ];

    const selectRow = {
        mode: 'checkbox',
        clickToEdit: true,
        style: {background: '#def3ff'},
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelectedId([...selectedId, row.uid]);
            } else {
                setSelectedId([]);
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                const array = [];
                for (let i = 0; i < rows.length; i++) {
                    array.push(rows[i].uid);
                }
                setSelectedId(array);
            } else {
                setSelectedId([]);
            }
        }
    };

    function handleChangeDb() {
        setUsers(getAllUsers());
    }

    return (
        <div>
            <Toolbar usersSelected={selectedId} onChange={handleChangeDb}/>
            <h2 align="center">Users</h2>
            <BootstrapTable keyField='uid' data={users} columns={columns} filter={filterFactory()}
                            selectRow={selectRow}/>
            <div className="wrapper">
                <button className="btn btn-primary" onClick={() => auth.signOut()}>Sign out</button>
            </div>
        </div>
    );
}

export default Table;
