import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Pane, majorScale, Heading, Text, Button, TextInputField, FilePicker, Label } from "evergreen-ui";
import { useParams } from "react-router";


const UpdateUserType = () => {
    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        short_summary: "",
        long_summary: "",
        user_id: parseInt(id),
        avatar_img: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <Pane
            display="flex"
            flexDirection="column"
            className="vbox">
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginY={majorScale(4)}>

                <Pane
                    max-width="480px"
                    display="block"
                    textAlign="center">
                    <Pane>
                        {JSON.stringify(user, null, 2)}
                        <Heading
                            size={900}
                            is="h1"
                            textAlign="center"
                            marginY={majorScale(1)}>Create your profile</Heading>
                        <Text
                            size={600}
                            textAlign="center">
                            Login to make an appoint book with these professional therapists
                            who are available now.
                        </Text>
                    </Pane>
                    <Pane
                        display="block"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="left"
                        marginY={majorScale(3)}
                    >
                        <form onSubmit={handleSubmit}>
                            <TextInputField
                                type='text'
                                className='form-control'
                                label="Preferred name"
                                id='therapist_first_name'
                                aria-describedby='therapist_first_name'
                                placeholder='Preferred name'
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
                                    onChange={file => setForm({
                                        ...form,
                                        avatar_img: file[0]
                                    })
                                    }
                                    placeholder="Select the file here!"
                                />
                            </Pane>
                            <Button type='submit' appearance="primary">
                                Create Profile
                            </Button>
                        </form>
                    </Pane>
                </Pane>
            </Pane>
        </Pane >
    )
}

export default UpdateUserType