/* eslint-disable */

import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import moonFill from '@iconify/icons-eva/moon-fill';
import sunFill from '@iconify/icons-eva/sun-fill';
// material
import { alpha } from '@mui/material/styles';
// import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box, Grid, Radio, Paper, RadioGroup, CardActionArea, FormControlLabel } from '@mui/material';

// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
// hooks
import useSettings from '../../hooks/useSettings';
import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------

export default function ThemePopover() {
  const anchorRef = useRef(null);
  const { themeMode, onChangeMode, isLight } = useSettings();

  return (
    <MIconButton
        ref={anchorRef}
        onClick={() => {
          onChangeMode(isLight ? "dark" : "light")
        }}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: -1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: () => isLight ? "#fff" : "#111",
            }
          })
        }}
      >
        <Icon icon={isLight ? moonFill : sunFill} width={24} height={24} />
      </MIconButton>
  );
}
