import React, { useEffect, useState } from 'react'
import faker from 'faker'
import styled from 'styled-components'
import Suggestions from './Suggestions'

const Suggestion = () => {

  const [suggestions, setSuggstion] = useState([])

  useEffect(() => {
    const fakeData = [...Array(5)].map((_, i) => (
      {
        ...faker.helpers.contextualCard(),
        id: i,
      }
    ))
    setSuggstion(fakeData)
  }, [])

  console.log(suggestions)


  return (

    <Container>
    <div className='ml-8 mt-2'>
      <SuggestionHead className='text-sm mt-5 mb-5'>
        <h3 className='text-gray-600'>Suggestions For You</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </SuggestionHead>
    </div>

    {suggestions.map((profile) => (
      <Suggestions key={profile.id} img={profile.avatar} company={profile.company.name} username={profile.username} />
    ))} 
    </Container>
  )
}

export default Suggestion

const SuggestionHead = styled.div`
display: flex;
justify-content: space-between;
`
const Container = styled.div``
