// hooks
// import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar() {
  // const { user } = useAuth();

  return (
    <MAvatar src="/static/mock-images/avatars/avatar_default.jpg" alt="">
      {createAvatar()}
    </MAvatar>
  );
}
