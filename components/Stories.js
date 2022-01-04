import React, { useEffect, useState } from 'react'
import faker from 'faker'
import Story from './Story'
import styled from 'styled-components'
import { useSession, signIn, signOut } from "next-auth/react"

const Stories = () => {

  const { data: session } = useSession()

  console.log(session?.user?.image)

    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        const fakeData = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: 1,
        }))
        setSuggestion(fakeData)
    }, [])

  return (
    <Container className='img'>
      
      {session && (
        <Story img={session.user.image} username={session.user.username}/>
      )}

      {suggestion.map((profile) => (
          <Story key={profile.id} img="https://fakeimg.pl/50x50/" username={profile.username}/>
      ))}

    </Container>
  )
}

export default Stories

const Container = styled.div`
display: flex;
margin-top: 10px;
padding: 6px;
border: 1px solid grey;
border-radius: 5px;
overflow-x: scroll;
`

