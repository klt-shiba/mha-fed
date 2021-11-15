import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextInputField, Textarea, Pane, Button, RadioGroup, Heading, Text, majorScale, Label, FilePicker } from "evergreen-ui";

// Edit Profile component
const EditSummary = () => {
  // Set and Get profile form values
  const [short_summary, setShortSummary] = useState("");

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
          maxWidth="546px"
          display="block"
          textAlign="center">
          <Pane>
            <Heading
              size={900}
              is="h1"
              textAlign="center"
              marginY={majorScale(1)}
              htmlFor="introduce_yourself">Introduce yourself</Heading>
            <Text
              size={600}
              textAlign="center">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.</Text>
          </Pane>
          <Pane
            display="block"
            alignItems="center"
            justifyContent="center"
            textAlign="left"
            marginY={majorScale(3)}
          >
            <form>
              <Pane
                marginY={majorScale(3)}>
                <Label htmlFor="therapist_about_myself" marginBottom={4} display="block">
                  Give us a
                </Label>
                <TextInputField
                  type='text'
                  className='form-control'
                  id='introduce_yourself'
                  placeholder='Counsellor specialising in Anxiety, Relationship Issues and Trauma and PTSD'
                  rows='1'
                  onChange={e => setShortSummary(e.target.value)}
                  value={short_summary}
                />
              </Pane>
              <Pane>
                <Label htmlFor="therapist_about_myself" marginBottom={4} display="block">
                  Tell us about yourself
                </Label>
                <Textarea
                  type='text'
                  className='form-control'
                  id='therapist_about_myself'
                  placeholder='Hi, Im a Counsellor specialising in Anxiety, Relationship Issues and Trauma and PTSD'
                  rows='3'
                  onChange={e => setShortSummary(e.target.value)}
                  value={short_summary}
                />
              </Pane>
            </form>
          </Pane>
        </Pane>
      </Pane >
    </Pane >
  );
};

export default EditSummary;
