import { blue, green, red, yellow } from '@mui/material/colors';

/**
 * Background color for log level badge.
 */
export function getLogLevelColor(level) {
  switch (level) {
    case 'Info':
      return blue[400];
    case 'Warn':
      return yellow[400];
    case 'Error':
      return red[400];
    default:
      return green[400];
  }
}
