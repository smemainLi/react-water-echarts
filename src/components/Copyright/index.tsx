import React, { FC } from 'react';
import styled from 'styled-components';
import { px2vw } from '../../utils/px2vw';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Span = styled.span`
  margin-top: ${px2vw(80)};
  font-size: ${px2vw(24)};
  color: rgba(42, 167, 211, 0.2);
  position: absolute;
  bottom: ${px2vw(40)};
`

export const Copyright: FC = () => {
  return (
    <MainContainer>
      <Span>Copyright Ⓒ 2014-2019 Qi-Cloud.com</Span>
    </MainContainer>
  )
}

export default Copyright;