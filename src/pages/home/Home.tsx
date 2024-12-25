import styled from 'styled-components'
import { UpdateName } from './UpdateName'
import { Transition } from './Transition'
import { ActionState } from './ActionState'
import { FormStatus } from './FormStatus'
import { Optimistic } from './Optimistic'
import { type JSX } from 'react'
// import { HeavyLeakyComponent } from './leakyCounter'

export default function Home(): JSX.Element {
  console.log('hhh')

  return (
    <HomeWrap>
      <UpdateName />
      <Transition />
      <ActionState />
      <FormStatus />
      <Optimistic />
      {/* <HeavyLeakyComponent/> */}
    </HomeWrap>
  )
}

export const HomeWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`
