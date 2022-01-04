import React from 'react'
import styled from 'styled-components'
import { useSession, signIn, signOut } from "next-auth/react"

const MiniProfile = () => {
  const { data: session } = useSession()

  return (
    <Container className=' flex items-center justify-between ml-8 mt-2'>

        <UserLoggedInImage src={!session ? "https://fakeimg.pl/50x50/" : session.user.image} />

        <UserLoggedInInfo className='flex-1 mx-4'>
            <h1 className='font-bold'>{!session ? "Username" : session.user.username}</h1>
            <p className='text-sm text-gray-400'>{!session ? "user@gmail.com" : session.user.email}</p>
        </UserLoggedInInfo>

        <button onClick={() => signOut()} className='text-blue-400 font-semibold text-sm :hover cursor-pointer'>Sign Out</button>
     
    </Container>
  )
}

export default MiniProfile

const Container = styled.div``

const UserLoggedInImage = styled.img`
height: 50px;
width: 50px;
border-radius: 50px;
padding: 2px;
border: 2px solid gray;
`

const UserLoggedInInfo = styled.div``
