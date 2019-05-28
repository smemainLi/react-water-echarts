import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { px2vw } from "../../utils/px2vw";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size:  ${px2vw(20)};
  color: rgba(255,255,255,0.5);
`

const Content = styled.div<{ value: number }>`
  display: flex;
  align-items: center;
  width: ${px2vw(47)};
  height: ${px2vw(23)};
  border-radius:${px2vw(3)};
  margin-left: ${px2vw(7)};
  border: ${px2vw(1)} solid ${props => props.value > 10 ? 'rgba(255,255,255,0.5)' : '#FD1763'} ;
  padding: ${px2vw(2)};
  box-sizing: border-box;
  position: relative;

  &::after {
    content: '';
    width: ${px2vw(3)};
    height: ${px2vw(8)};
    position: absolute;
    background-color: ${props => props.value > 10 ? 'rgba(255,255,255,0.5)' : '#FD1763'} ;
    border-radius: 0 ${px2vw(4)} ${px2vw(4)} 0; 
    right: ${px2vw(-4)};
    top: ${px2vw(6)};
  }
`

const Body = styled.div<{ value: number }>`
  height: ${px2vw(15)};
  width: ${props => px2vw(Math.floor(props.value / 100 * 40))};
  background: ${props => props.value > 10 ? 'rgba(255,255,255,0.5)' : '#FD1763'} ;
`

export interface BatteryProps {
  value: number
}

export const Battery: FC<BatteryProps> = props => {
  const { value } = props
  return (
    <Container>
      {/* {value}% */}
      <Content value={value}>
        <Body value={value} />
      </Content>
    </Container>
  )
}

export default Battery;