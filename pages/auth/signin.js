import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import Header from '../../components/Header'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const DynamicComponentWithHeader = dynamic(
  () => import('../../components/Header'),
  { ssr: false }
)

const signin = ({ providers }) => {
  return (
    <div>
      <DynamicComponentWithHeader />

      <Container className='flex flex-col items-center mt-16'>

        <img src="https://links.papareact.com/ocw" className='w-80' alt="" />
        <p className='text-sm italic'>This is the Instagram clone, made just for the learning purpose...</p>

        <div className='mt-10'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className='bg-blue-500 text-white rounded-lg p-3' onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>

      </Container>

    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default signin

const Container = styled.div``
