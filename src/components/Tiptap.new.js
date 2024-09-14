'use client'
// https://tiptap.dev/docs/editor/examples/default
// https://lucide.dev/icons/
import { Editor, EditorContent, useEditor, useEditorState } from '@tiptap/react'
import deepEqual from 'deep-equal'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Strikethrough,
  Type,
  WrapText,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Minus,
  Undo,
  Redo,
  Palette,
  Codepen,
  Code,
  Quote,
  RemoveFormatting,
  Delete,
  Eye
} from 'lucide-react'
import { useEffect, useState } from 'react'




const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


export default function Tiptap({ content, setContent }) {

  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
  })


  useEffect(() => {
    // When the component mounts, set new content
    if (editor && content) {
       editor.commands.setContent(content);
    }
  }, [editor, content]);


  const [color, setColor] = useState('#000000')

  // const editorState = useEditorState({
  //   editor,
  //   // This function will be called every time the editor state changes
  //   selector: ({ editor: editorInstance }) => ({
  //     // It will only re-render if the bold or italic state changes
  //     isBold: editorInstance.isActive('bold'),
  //     isItalic: editorInstance.isActive('italic'),
  //   }),
  //   // This function will be used to compare the previous and the next state
  //   equalityFn: deepEqual,
  // })




  editor.on('transaction', ({ editor }) => {
    setContent(editor.getHTML())
  })

  const showMessage = () => {
    const html = editor.getHTML()
    alert(html) // Mostrar el HTML en una alerta
  }


  const clearEditorContent = () => {
    if (editor) {
      // Clear the content of the editor
      editor.commands.clearContent();
    }
  };

  const setNewContent = () => {
    if (editor) {
      // Clear the content of the editor
      editor.commands.setContent(content);
    }
  };



  return (
    <>
      <div>
        {/* Button to clear content */}
        <button onClick={setNewContent}>Set Content</button>
      </div>
      <Bold strokeWidth={4}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'editor-option is-active' : 'editor-option'}
      />

      <Italic
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'editor-option is-active' : 'editor-option'}
      />

      <Eye
        onClick={showMessage}
        className='editor-option'
      />

      {content}

      {editor && <EditorContent editor={editor} />}
    </>
  )
}