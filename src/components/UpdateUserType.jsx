import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Pane, majorScale, Heading, Text, Button, TextInputField, FilePicker, Label } from "evergreen-ui";
import { useParams } from "react-router";
import FormCard from './FormCard';
import Section from './Section'


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
            backgroundColour="#f2f2f2">
            <FormCard
                formHeading="Update personal information"
                formSubheading="This is a subheading"
                inputBody={renderFields()}
                secondaryLabel="Cancel"
                primaryLabel="Update information" />
        </Section>
    )
}

export default UpdateUserType