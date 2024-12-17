import { Button } from 'antd'
import styled from 'styled-components'

export default function Home(): JSX.Element {
  return (
    <HomeWrap>
      <Button type="primary">homeButton</Button>
    </HomeWrap>
  )
}

export const HomeWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
