import React, { ComponentPropsWithRef, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import nanoid from 'nanoid';
import fontStyles from './font-styles';

const ANIMATION_DURATION = '200ms';
const ANIMATION_EASING = 'cubic-bezier(0.0, 0.0, 0.2, 1)';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(67, 90, 111, 0.699);
`;

const openAnimation = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

interface RootProps extends ComponentPropsWithRef<'section'> {
  width: number | string | undefined;
}

const Root = styled.section<RootProps>`
  ${fontStyles};
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 16px);
  max-height: calc(100vh - 16px);
  width: ${props => props.width};
  margin: 8px;
  background: #fff;
  border-radius: 8px;
  animation: ${openAnimation} ${ANIMATION_DURATION} ${ANIMATION_EASING} both;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Header = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(67, 90, 111, 0.079);
`;

const Title = styled.h2`
  margin: 0;
  color: #1f4160;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
`;

const Content = styled.div`
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 0;
  min-height: 0;
  font-size: 14px;
  line-height: 1.2;

  p {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 0.7em;
    }
  }

  a {
    color: #47b881;
    &:hover {
      color: #64c395;
    }
    &:active {
      color: #248953;
    }
  }
`;

const Buttons = styled.div`
  padding: 16px;
  text-align: right;
`;

interface DialogProps {
  onCancel?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: React.ReactNode;
  buttons: React.ReactNode;
  width?: string;
}

export default class Dialog extends PureComponent<DialogProps, {}> {
  static displayName = 'Dialog';
  private titleId: string;
  private container: HTMLElement;
  private form: HTMLFormElement;

  static defaultProps = {
    width: '750px',
  };

  constructor(props: DialogProps) {
    super(props);

    this.titleId = nanoid();
    this.container = document.createElement('div');
    this.container.setAttribute('data-consent-manager-dialog', '');

    document.body.appendChild(this.container);
  }

  render() {
    const { onSubmit, title, children, buttons, width } = this.props;

    const dialog = (
      <Overlay>
        <Root
          role="dialog"
          aria-modal
          aria-labelledby={this.titleId}
          width={width}
        >
          <Header>
            <Title id={this.titleId}>{title}</Title>
          </Header>

          <Form ref={this.handleFormRef} onSubmit={onSubmit}>
            <Content>{children}</Content>

            <Buttons>{buttons}</Buttons>
          </Form>
        </Root>
      </Overlay>
    );

    return ReactDOM.createPortal(dialog, this.container);
  }

  componentDidMount() {
    if (this.form) {
      const input: HTMLInputElement | null = this.form.querySelector(
        'input,button',
      );
      if (input) {
        input.focus();
      }
    }
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
    document.body.removeChild(this.container);
  }

  handleFormRef = (node: HTMLFormElement) => {
    this.form = node;
  };
}
