import React from 'react'
import styled from 'styled-components'

const Story = (props) => {
  return (
    <Container>
      <Image src={props.img} alt="" />
      <p className='para'>{props.username}</p>
    </Container>
  )
}

export default Story

const Container = styled.div``

const Image = styled.img`
border-radius: 50px;
padding: 1.4px;
border: 1px solid #F56040;
cursor: pointer;
transition: all .2s ease-in-out;

:hover {
  transform: scale(1.1);
}
`


