import styled from 'styled-components'
import { Button } from 'evergreen-ui'


const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    display: ${props => props.isHidden ? "none" : "flex"};
`

const ResultsBar = ({ showingAllTherapists, searchResult, hasClick, numberOfResults, totalTherapists, isHidden, isIssue }) => {
    return (
        <Container isHidden={isHidden}>
            <div>
                {showingAllTherapists ?
                    <div>
                        <h2>Showing all therapists</h2>
                    </div> :
                    <div>
                        {isIssue ?
                            <>
                                <h2>Showing therapists who help with {searchResult}</h2>
                                <p>Showing {numberOfResults} of {totalTherapists}</p>
                            </> :
                            <>
                                <h2>Showing all from {searchResult}</h2>
                                <p>Showing {numberOfResults} of {totalTherapists}</p>
                            </>
                        }
                    </div>
                }
            </div>
            <div>
                <Button
                    type="submit"
                    height={56}
                    marginLeft={16}
                    width={120}
                    onClick={hasClick}>
                    Clear
                </Button>
            </div>
        </Container>

    )
}

export default ResultsBar