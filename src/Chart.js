import {Pie} from "react-chartjs-2";
import React, {useEffect, useState} from 'react'
import firebase from "./configs/firebase-config";

const Chart = () => {
    const [usersFacebook, setUsersFacebook] = useState(0);
    const [usersTwitter, setUsersTwitter] = useState(0);
    const [usersGithub, setUsersGithub] = useState(0);

    const getUsersCount = (socialNetwork) => {
        let count = 0;
        const database = firebase.database().ref('users/').orderByChild('socialNetwork').equalTo(socialNetwork);
        database.on("value", async snapshot => {
            snapshot.forEach(childSnapShot => {
                count++;
            });
        });
        return count;
    }

    useEffect(() => {
        setUsersFacebook(getUsersCount('facebook.com'));
        setUsersTwitter(getUsersCount('twitter.com'));
        setUsersGithub(getUsersCount('github.com'));
    }, []);

    const state = {
        labels: ['Facebook', 'Twitter', 'Github'],
        datasets: [
            {
                backgroundColor: [
                    '#3b5998',
                    '#55acee',
                    '#444'
                ],
                hoverBackgroundColor: [
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: [usersFacebook, usersTwitter, usersGithub]
            }
        ]
    }

    return (
        <div className="App">
            <Pie
                data={state}
                options={{
                    plugins: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Amount of users in social networks',
                            fontSize: 15
                        },
                        legend: {
                            display: true,
                            position: 'top',
                        }
                    }
                }}
            />
        </div>);
}
export default Chart;
