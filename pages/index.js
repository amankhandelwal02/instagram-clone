import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import dynamic from 'next/dynamic'
import Modal from '../components/Modal'

const DynamicComponentWithHeader = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)

const DynamicComponentWithFeed= dynamic(
  () => import('../components/Feed'),
  { ssr: false }
)

export default function Home() {
  return (
    <div className='bg-gray-100 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram Clone Using Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicComponentWithHeader />
      <DynamicComponentWithFeed />
      {/* <Header />     */}
      {/* <Feed /> */}
      <Modal />
    </div>
  )
}
