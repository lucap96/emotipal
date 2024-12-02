import { useState } from 'react';

// next
import dynamic from 'next/dynamic';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import 'react-quill/dist/quill.snow.css';

// project-imports
import { ThemeMode } from 'config';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

// ==============================|| EDITOR - QUILL ||============================== //

export default function ReactQuillDemo() {
  const theme = useTheme();
  const [text, setText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const handleChange = (value: string) => {
    setText(value);
  };

  const iconColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.text.secondary : theme.palette.secondary.dark;
  const bgColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.background.paper;

  const toolbarStyles = `
  .ql-toolbar .ql-formats button .ql-stroke {
    stroke: ${iconColor};
  }
  .ql-toolbar .ql-formats button .ql-fill {
    fill: ${iconColor};
  }
  .ql-toolbar .ql-picker {
    color: ${iconColor};
  }
  .ql-toolbar .ql-picker-options {
    color: ${iconColor};
    background-color: ${bgColor};
  }
  .ql-toolbar .ql-picker-item {
    color: ${iconColor};
  }
  .ql-toolbar .ql-picker-label::before {
    color: ${iconColor};
  }
  .ql-toolbar .ql-picker-label .ql-stroke {
    stroke: ${iconColor};
  }
  .ql-toolbar .ql-picker-label .ql-fill {
    fill: ${iconColor};
  }
`;

  return (
    <>
      <style>{toolbarStyles}</style>
      <ReactQuill value={text} onChange={handleChange} />
    </>
  );
}
