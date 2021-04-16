import React, { ComponentPropsWithRef, PureComponent } from 'react';
import styled from 'styled-components';
import { DefaultButton, GreenButton } from './buttons';
import fontStyles from './font-styles';

interface RootProps extends ComponentPropsWithRef<'div'> {
  backgroundColor: string;
  textColor: string;
}

const Root = styled.div<RootProps>`
  ${fontStyles};
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: left;
  line-height: 1.3;
  box-shadow: 0 0 23px 0 rgb(58 70 76 / 20%);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2.5rem 1rem 1rem;
  color: inherit;
  font: inherit;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 650px) {
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
  }
`;

const AcceptButton = styled(GreenButton)`
  margin: 0 0 10px;
`;
const PreferencesButton = styled(DefaultButton)`
  margin: 0 0 10px;
  text-align: center;
  padding: 12px 19px;
  font-size: 18px;
  line-height: 14px;
  background: #ffffff;
  color: #404040;
  border: 1px solid rgba(40, 40, 40, 0.3);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 650px) {
    margin-right: 15px;
  }
`;

const P = styled.p`
  margin: 0;
  padding: 0 2rem 0 0;
  flex: 1 0 80%;

  @media (max-width: 960px) {
    min-width: 100%;
    margin-bottom: 20px;
  }

  @media (max-width: 650px) {
    min-width: 100%;
    margin-bottom: 20px;
  }
`;

interface Props {
  onAcceptAllPreferences: () => void;
  onChangePreferences: () => void;
  content: React.ReactNode;
  acceptButtonContent: React.ReactNode;
  settingsButtonContent: React.ReactNode;
  backgroundColor: string;
  textColor: string;
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner';

  render() {
    const {
      onAcceptAllPreferences,
      onChangePreferences,
      content,
      acceptButtonContent,
      settingsButtonContent,
      backgroundColor,
      textColor,
    } = this.props;

    return (
      <Root backgroundColor={backgroundColor} textColor={textColor}>
        <Content>
          <P>{content}</P>
          <ButtonContainer>
            <AcceptButton type="button" onClick={onAcceptAllPreferences}>
              {acceptButtonContent}
            </AcceptButton>
            <PreferencesButton type="button" onClick={onChangePreferences}>
              {settingsButtonContent}
            </PreferencesButton>
          </ButtonContainer>
        </Content>
      </Root>
    );
  }
}
