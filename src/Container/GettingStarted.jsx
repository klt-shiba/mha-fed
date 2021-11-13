import React, { useState, useEffect } from "react";
import { Textarea, Pane, Button, Label, Heading, Text, majorScale } from "evergreen-ui";
import EditUserType from "../components/EditUserType";
import EditIssues from "../components/EditIssues";


const GettingStarted = () => {

    const [step, setStep] = useState(1)



    const prevStep = () => {
        const currentStep = step
        setStep(currentStep - 1)
    }

    const nextStep = () => {
        const currentStep = step
        setStep(currentStep + 1)
    }


    const renderForms = () => {

        switch (step) {
            case 1:
                return (
                    <EditUserType
                        nextStep={nextStep}
                    />
                )
            case 2:
                return (
                    <EditIssues
                        nextStep={nextStep}
                        prevStep={prevStep} />
                )
            // case 3:
            //     return (
            //         <Confirmation />
            //     )
            // case 4:
            //     return (
            //         <Success />
            //     )
            // never forget the default case, otherwise VS code would be mad!
            default:
            // do nothing
        }
    }

    return (
        <>
            {renderForms()}
        </>
    )
}

export default GettingStarted