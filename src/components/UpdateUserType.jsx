import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Pane, majorScale, TextInputField, FilePicker, Label } from "evergreen-ui";
import { useParams, useHistory } from "react-router";
import FormCard from './FormCard';
import Section from './Section'


const UpdateUserType = () => {

    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    const [isTherapist, setIsTherapist] = useState(null)
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        avatar_img: "",
        user_id: ""
    })

    const userId = user ? user.id : null
    let urlId = ""

    const checkUserType = () => {

        if (!user) {
            setIsTherapist(null)
            return false
        } else if (user.attributes.client === null) {
            setIsTherapist(true)
            urlId = user.attributes.therapist.id
        } else if (user.attributes.therapist === null) {
            setIsTherapist(false)
            urlId = user.attributes.client.id
        } else {
            setIsTherapist(null)
            return false
        }
    }


    useEffect(() => {
        checkUserType()
    }, [user])

    const token = localStorage.getItem('token')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    const routeToProfile = () => {
        history.push(`/users/${user.id}/profile`)
    }

    const handleClick = (e) => {
        e.preventDefault()
        switch (e.target.value) {
            case "Cancel":
                routeToProfile()
                break;
            case "Submit":
                patchDetails()
                break;
            default:
                console.log("Not working")
        }
    }

    const formData = new FormData()


    const patchDetails = () => {

        formData.append('user_id', userId)
        formData.append('first_name', form.first_name)
        formData.append('last_name', form.last_name)
        formData.append('avatar_img', form.avatar_img)

        const url = isTherapist ?
            `http://127.0.0.1:3001/api/v1/therapists/${urlId}/update` :
            `http://127.0.0.1:3001/api/v1/clients/${urlId}/update`

        fetch(url, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error));
    };

    const renderFields = () => {
        return (
            <Pane>
                <TextInputField
                    type='text'
                    className='form-control'
                    label="Preferred name"
                    id='therapist_first_name'
                    aria-describedby='therapist_first_name'
                    placeholder='Preferred name'
                    inputHeight={48}
                    onChange={e => setForm({
                        ...form,
                        first_name: e.target.value
                    })}
                    value={form.first_name}
                />
                <TextInputField
                    type='text'
                    label="Last name"
                    className='form-control'
                    id='therapist_last_name'
                    placeholder='Last name'
                    inputHeight={48}
                    onChange={e => setForm({
                        ...form,
                        last_name: e.target.value
                    })}
                    value={form.last_name}
                />
                <Pane
                    marginY={majorScale(1)}
                    className='form-group'>
                    <Label htmlFor="edit_profile_image" marginBottom={4} display="block">
                        Stand out with a smile!
                    </Label>
                    <FilePicker
                        single
                        id="edit_profile_image"
                        width={250}
                        inputHeight={48}
                        onChange={file => setForm({
                            ...form,
                            avatar_img: file[0]
                        })
                        }
                        placeholder="Select the file here!"
                    />
                </Pane>
            </Pane>
        )
    }

    return (
        <Section
            backgroundColour="#f2f2f2"
            hasPaddingTop
            hasPaddingBottom>
            {console.log(user)}
            <FormCard
                formHeading="Update personal details"
                formSubheading="This is a subheading"
                inputBody={renderFields()}
                secondaryLabel="Cancel"
                onSecondaryClick={handleClick}
                secondaryValue={"Cancel"}
                primaryLabel="Update personal details"
                onPrimaryClick={handleClick}
                primaryValue={"Submit"}
            />
        </Section>
    )
}

export default UpdateUserType