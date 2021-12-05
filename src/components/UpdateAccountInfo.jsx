import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Pane, TextInputField } from "evergreen-ui";
import { useParams, useHistory } from "react-router";
import FormCard from './FormCard';
import Section from './Section'



const UpdateAccountInfo = () => {

    const token = localStorage.getItem("token")
    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    })
    const history = useHistory()

    const updateAccount = () => {
        const url = `http://127.0.0.1:3001/api/v1/users/${id}/update`;
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
                setUser(data)
            })
            .catch((error) => console.log(error));
    };


    const renderFields = () => {
        return (
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
                    id='therapist_last_name'
                    inputHeight={48}
                    onChange={e => setForm({
                        ...form,
                        password: e.target.value,
                        password_confirmation: e.target.value
                    })}
                    value={form.password}
                />
            </Pane>
        )
    }

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

    const routeToProfile = () => {
        history.push(`/users/${user.id}/profile`)
    }
    return (
        <Section
            backgroundColour="#f2f2f2"
            hasPaddingTop
            hasPaddingBottom>
            <FormCard
                formHeading="Update account details"
                formSubheading="This is a subheading"
                inputBody={renderFields()}
                secondaryLabel="Cancel"
                onSecondaryClick={handleClick}
                secondaryValue={"Cancel"}
                primaryLabel="Update account details"
                onPrimaryClick={handleClick}
                primaryValue={"Submit"}
            />
        </Section>
    )
}

export default UpdateAccountInfo