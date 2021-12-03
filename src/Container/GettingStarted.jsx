import React, { useState } from "react";
import EditUserType from "../components/EditUserType";
import EditIssues from "../components/EditIssues";
import EditTreatment from "../components/EditTreatment";
import { useHistory } from "react-router";


const GettingStarted = () => {

    const [step, setStep] = useState(1)
    const history = useHistory()



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
            case 3:
                return (
                    <EditTreatment
                        nextStep={nextStep}
                        prevStep={prevStep} />
                )
            case 4:
                return (
                    history.push('/therapists')
                )
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