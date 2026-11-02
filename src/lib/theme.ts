import { Platform } from 'react-native';

// Colors used across the page. Change them here to restyle everything.
// Look: a shop drawing — off-white paper, pencil-dark ink, tape-measure yellow.
export const colors = {
  paper: '#F4F3EF',
  grid: '#E3E2DC',
  surface: '#FFFFFF',
  ink: '#16181A',
  muted: '#5B6064',
  line: '#CFCFC8',
  tape: '#F2C12E', // tape-measure yellow
  tapeSoft: '#FBEFC4',
  success: '#2E6B45',
  error: '#B3261E',
};

// On the web, add a fallback in case the font hasn't loaded yet.
const withFallback = (name: string, fallback: string) =>
  Platform.OS === 'web' ? `${name}, ${fallback}` : name;

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const mono = 'ui-monospace, Menlo, Consolas, monospace';

export const fonts = {
  display: withFallback('Archivo_800ExtraBold', sans),
  body: withFallback('Archivo_400Regular', sans),
  medium: withFallback('Archivo_600SemiBold', sans),
  mono: withFallback('IBMPlexMono_500Medium', mono),
};

export const maxWidth = 1040;
