import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Pane, TextInputField, Button } from "evergreen-ui";
import { useParams, useHistory } from "react-router";
import Section from './Section'
import PageTitle from "./PageTitle";
import { Container } from "reactstrap";
import LinearProgress from '@mui/material/LinearProgress';

const UpdateAccountInfo = () => {

    const token = localStorage.getItem("token")
    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        switch (e.target.value) {
            case "Cancel":
                routeToProfile()
                break;
            case "Submit":
                updateAccount()
                break;
            default:
                console.log("Not working")
        }
    }

    const handleSuccessOrFailure = (value) => {
        switch (value) {
            case "Fail":
                console.log("Failure")
                break;
            case "Success":
                routeToProfile()
                break;
            default:
                console.log("Not working")
        }
    }

    const updateAccount = () => {
        setIsLoading(true)
        const url = `https://damp-journey-90616.herokuapp.com/api/v1/users/${id}/update`;
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setIsLoading(false)
                    handleSuccessOrFailure("Success")
                }, 2000)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                handleSuccessOrFailure("Fail")
            });
    };

    const routeToProfile = () => {
        history.push(`/users/${user.id}/profile`)
    }
    return (
        <>
            <PageTitle
                isSmall
                title="Update account details"
                hasBackgroundColour="#bba4dc"
                summary="Review and update your account details."

            />
            {isLoading ? <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} /> : false}
            <Section
                backgroundColour="#fafafa"
                hasPaddingTop
                hasPaddingBottom>
                <Container fluid="xl">
                    <Pane
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="left">
                        <Pane
                            width="100%"
                            maxWidth='720px'>
                            <Pane>
                                <TextInputField
                                    type='text'
                                    className='form-control'
                                    label="Update email address"
                                    id='user_email'
                                    aria-describedby='user_email'
                                    placeholder={user ? user.attributes.email : "hi@email.com"}
                                    inputHeight={48}
                                    onChange={e => setForm({
                                        ...form,
                                        email: e.target.value
                                    })}
                                    value={form.email}
                                />
                                <TextInputField
                                    type='password'
                                    label="Update password"
                                    className='form-control'
                                    id='user_password'
                                    inputHeight={48}
                                    onChange={e => setForm({
                                        ...form,
                                        password: e.target.value,
                                        password_confirmation: e.target.value
                                    })}
                                    value={form.password}
                                />
                            </Pane>
                            <Pane display="flex">
                                <Pane flex={1} alignItems="center" display="flex">

                                </Pane>
                                <Pane>
                                    <Button
                                        type="submit"
                                        appearance="default"
                                        size="large"
                                        height={48}
                                        fontSize="17px"
                                        marginRight={16}
                                        value="Cancel"
                                        onClick={handleClick}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        appearance="primary"
                                        size="large"
                                        value="Submit"
                                        height={48}
                                        fontSize="17px"
                                        onClick={handleClick}>
                                        Update account
                                    </Button>
                                </Pane>
                            </Pane>
                        </Pane>
                    </Pane>
                </Container>
            </Section>
        </>
    )
}

export default UpdateAccountInfo