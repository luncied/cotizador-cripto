import styled from "@emotion/styled"

const Texto = styled.div`
  background-color: #B7322C;
  color: white;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  text-align: center;
  border-radius: 10px;
`

const Error = ({ children }) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Error
