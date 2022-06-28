// import { capitalCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// import { Box, Card, Stack, Alert, Tooltip, Container, Typography } from '@mui/material';
import { Box, Card, Stack, Alert, Container, Typography } from '@mui/material';
// routes
// hooks
// import useAuth from '../../hooks/useAuth';
// layouts
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  // justifyContent: 'space-between',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  // const { method } = useAuth();

  // const handleLoginAuth0 = async () => {
  //   try {
  //     await login();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <RootStyle title="MOEYs | Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              flex: '0.7',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              color: 'gray'
            }}
          >
            <RouterLink to="/">
              <img src="/static/MOEYs_Logo.png" alt="" width="70" />
            </RouterLink>
            <Typography>
              <h3>Ministry of Education</h3>
            </Typography>
          </Box>
          {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography> */}
          <Box>
            <img src="/static/illustrations/illustration_login.png" alt="login" sx={{ width: '100' }} />
          </Box>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>

            {/* <Tooltip title={capitalCase(method)}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip> */}
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Username : <strong>camemis</strong> / password :<strong>&nbsp;camemis</strong>
          </Alert>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
