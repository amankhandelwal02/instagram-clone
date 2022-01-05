import React from 'react'
import styled from 'styled-components'

const Suggestions = ({id, avatar, company, username}) => {
  return (
    <Container className='ml-8 mt-2'>

        <SuggestedUserImage src="https://fakeimg.pl/50x50/" />

        <SuggestedUserInfo className='mx-6'>

            <h1 className='font-semibold text-sm'>{username}</h1>
            <p className='text-xs text-gray-400'>{company}</p>

        </SuggestedUserInfo>

        <button className='text-blue-400 font-bold text-xs'>Follow</button>
    </Container>
  )
}

export default Suggestions

const Container = styled.div`
display: flex;
align-items: center;
`

const SuggestedUserImage = styled.img`
height: 45px;
width: 45px;
border-radius: 50px;
padding: 2px;
border: 2px solid gray;

:hover {
  cursor: pointer;
}
`

const SuggestedUserInfo = styled.div`
flex: 1;

`
