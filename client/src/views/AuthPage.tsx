import styled from 'styled-components';
import TransitionProvider from 'providers/TransitionProvider';
import AuthForm from 'components/organisms/AuthForm/AuthForm';

const Wrapper = styled.div`
  padding: 4rem 0 0 0;
  max-height: 100vh;
  display: flex;
  justify-content: center;
`;

const AuthPage = () => (
  <TransitionProvider>
    <Wrapper>
      <AuthForm />
    </Wrapper>
  </TransitionProvider>
);

export default AuthPage;
