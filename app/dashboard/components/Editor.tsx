// @app/dashboard/components/Editor.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  return (
    <div className="h-full">
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ 
          height: '100%', 
          border: 'none',
        }}
      />
    </div>
  );
};

export default Editor;