import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import React from 'react';
import useLoginData from "../components/useLoginData";
import loader from '/images/loader.svg';
import Swal from "sweetalert2";

const User = {
    Page: () => {
        const { ready, loggedIn, user, error, logout, load } = useLoginData(state => state);
        return (
            <div className="md:mx-10 mx-5">
                {error ? ['There was an error logging in:', <br />, error, <br />, <Button onClick={() => load()}>Retry</Button>, <Button onClick={async () => {
                    const result = await Swal.fire({
                        title: 'Logout!',
                        text: 'Are you sure you want to log out?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Logout!'
                    });
                    if (result.isConfirmed) {
                        logout();
                        window.location.href = '#/'
                    }
                }}>Logout</Button>] :
                    ready ?
                        // TODO: Actually add logic to this
                        loggedIn ?
                            [
                                <h1 className="text-2xl">Welcome {user.username}</h1>,
                                <p>What would you like to do?</p>,
                                <p><Button onClick={async () => {
                                    const result = await Swal.fire({
                                        title: 'Logout!',
                                        text: 'Are you sure you want to log out?',
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: '#d33',
                                        cancelButtonColor: '#3085d6',
                                        confirmButtonText: 'Logout!'
                                    });
                                    if (result.isConfirmed) {
                                        logout();
                                        window.location.href = '#/'
                                    }
                                }}>Logout</Button></p>
                            ] :
                            [<p>To access this page please login.</p>, <Button link={`#/login/${window.location.hash}`}>Login!</Button>] :
                        <img className="m-auto h-16 mt-5" src={loader} />}
            </div >
        );
    },
    match: '^user$'
}

export default User;
