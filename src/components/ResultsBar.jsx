import styled from 'styled-components'
import { Button } from 'evergreen-ui'


const Container = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
`

const ResultsBar = ({ searchResult, hasClick, numberOfResults, totalTherapists }) => {
    return (
        <Container>
            <div>
                <h2>Showing all from {searchResult}</h2>
                <p>Showing {numberOfResults} of {totalTherapists}</p>
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