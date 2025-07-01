"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js"
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  FormControl,
  Tooltip,
} from "@mui/material"
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  FormatColorText,
  FormatColorFill,
} from "@mui/icons-material"
import "draft-js/dist/Draft.css"

// Custom styles for the editor
const editorStyles = {
  editor: {
    minHeight: "300px",
    padding: "16px",
    fontSize: "16px",
    lineHeight: "1.6",
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  toolbar: {
    padding: "8px 16px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fafafa",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
  },
}

// Block style map
const blockStyleMap = {
  "header-one": {
    fontSize: "2rem",
    fontWeight: "600",
    lineHeight: "1.2",
    margin: "16px 0 8px 0",
  },
  "header-two": {
    fontSize: "1.5rem",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "14px 0 6px 0",
  },
  "header-three": {
    fontSize: "1.25rem",
    fontWeight: "600",
    lineHeight: "1.4",
    margin: "12px 0 4px 0",
  },
  blockquote: {
    borderLeft: "4px solid #1976d2",
    paddingLeft: "16px",
    margin: "16px 0",
    fontStyle: "italic",
    color: "#666",
  },
  "code-block": {
    backgroundColor: "#f5f5f5",
    padding: "12px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "14px",
    margin: "8px 0",
  },
}

// Inline style map
const inlineStyleMap = {
  CODE: {
    backgroundColor: "#f1f1f1",
    padding: "2px 4px",
    borderRadius: "3px",
    fontFamily: "monospace",
    fontSize: "0.9em",
  },
}

interface RichTextEditorProps {
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  readOnly?: boolean
  minHeight?: number
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start writing...",
  readOnly = false,
  minHeight = 300,
}) => {
  // Initialize editor state
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value))
        return EditorState.createWithContent(contentState)
      } catch {
        return EditorState.createEmpty()
      }
    }
    return EditorState.createEmpty()
  })

  // Dialog states
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [colorMenuAnchor, setColorMenuAnchor] = useState<null | HTMLElement>(null)
  const [highlightMenuAnchor, setHighlightMenuAnchor] = useState<null | HTMLElement>(null)

  const editorRef = useRef<Editor>(null)

  // Handle editor state changes
  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState)
    if (onChange) {
      const contentState = newEditorState.getCurrentContent()
      const raw = convertToRaw(contentState)
      onChange(JSON.stringify(raw))
    }
  }

  // Focus editor
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // Inline style handlers
  const handleInlineStyle = (style: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  // Block type handlers
  const handleBlockType = (blockType: string) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  // Check if inline style is active
  const isInlineStyleActive = (style: string) => {
    return editorState.getCurrentInlineStyle().has(style)
  }

  // Check if block type is active
  const isBlockTypeActive = (blockType: string) => {
    const selection = editorState.getSelection()
    const blockKey = selection.getStartKey()
    const currentBlock = editorState.getCurrentContent().getBlockForKey(blockKey)
    return currentBlock.getType() === blockType
  }

  // Link handlers
  const handleAddLink = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      setLinkDialogOpen(true)
    }
  }

  const confirmLink = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
      url: linkUrl,
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    handleEditorChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey))
    setLinkDialogOpen(false)
    setLinkUrl("")
  }

  // Image handlers
  const handleAddImage = () => {
    setImageDialogOpen(true)
  }

  const confirmImage = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", {
      src: imageUrl,
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    handleEditorChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "))
    setImageDialogOpen(false)
    setImageUrl("")
  }

  // Color handlers
  const colors = [
    "#000000",
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b266",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "#3d1466",
  ]

  const handleColorChange = (color: string) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, `COLOR_${color.replace("#", "")}`)
    handleEditorChange(newEditorState)
    setColorMenuAnchor(null)
  }

  const handleHighlightChange = (color: string) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, `HIGHLIGHT_${color.replace("#", "")}`)
    handleEditorChange(newEditorState)
    setHighlightMenuAnchor(null)
  }

  // Key binding
  const keyBindingFn = (e: React.KeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e)) {
      switch (e.keyCode) {
        case 66: // B
          return "bold"
        case 73: // I
          return "italic"
        case 85: // U
          return "underline"
        case 75: // K
          return "add-link"
        default:
          return getDefaultKeyBinding(e)
      }
    }
    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (command: string) => {
    if (command === "add-link") {
      handleAddLink()
      return "handled"
    }

    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      handleEditorChange(newState)
      return "handled"
    }
    return "not-handled"
  }

  // Block renderer for images
  const blockRendererFn = (block: any) => {
    if (block.getType() === "atomic") {
      return {
        component: ImageComponent,
        editable: false,
      }
    }
    return null
  }

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      {/* Toolbar */}
      <Box sx={editorStyles.toolbar}>
        {/* History */}
        <ToggleButtonGroup size="small">
          <ToggleButton
            value="undo"
            onClick={() => handleEditorChange(EditorState.undo(editorState))}
            disabled={editorState.getUndoStack().size === 0}
          >
            <Tooltip title="Undo (Ctrl+Z)">
              <Undo fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="redo"
            onClick={() => handleEditorChange(EditorState.redo(editorState))}
            disabled={editorState.getRedoStack().size === 0}
          >
            <Tooltip title="Redo (Ctrl+Y)">
              <Redo fontSize="small" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Block Types */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={
              isBlockTypeActive("header-one")
                ? "header-one"
                : isBlockTypeActive("header-two")
                  ? "header-two"
                  : isBlockTypeActive("header-three")
                    ? "header-three"
                    : "unstyled"
            }
            onChange={(e) => handleBlockType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="unstyled">Normal</MenuItem>
            <MenuItem value="header-one">Heading 1</MenuItem>
            <MenuItem value="header-two">Heading 2</MenuItem>
            <MenuItem value="header-three">Heading 3</MenuItem>
          </Select>
        </FormControl>

        <Divider orientation="vertical" flexItem />

        {/* Text Formatting */}
        <ToggleButtonGroup size="small">
          <ToggleButton value="bold" selected={isInlineStyleActive("BOLD")} onChange={() => handleInlineStyle("BOLD")}>
            <Tooltip title="Bold (Ctrl+B)">
              <FormatBold fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="italic"
            selected={isInlineStyleActive("ITALIC")}
            onChange={() => handleInlineStyle("ITALIC")}
          >
            <Tooltip title="Italic (Ctrl+I)">
              <FormatItalic fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="underline"
            selected={isInlineStyleActive("UNDERLINE")}
            onChange={() => handleInlineStyle("UNDERLINE")}
          >
            <Tooltip title="Underline (Ctrl+U)">
              <FormatUnderlined fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="code" selected={isInlineStyleActive("CODE")} onChange={() => handleInlineStyle("CODE")}>
            <Tooltip title="Inline Code">
              <Code fontSize="small" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Colors */}
        <IconButton
          size="small"
          onClick={(e) => setColorMenuAnchor(e.currentTarget)}
          sx={{ border: 1, borderColor: "divider" }}
        >
          <Tooltip title="Text Color">
            <FormatColorText fontSize="small" />
          </Tooltip>
        </IconButton>

        <IconButton
          size="small"
          onClick={(e) => setHighlightMenuAnchor(e.currentTarget)}
          sx={{ border: 1, borderColor: "divider" }}
        >
          <Tooltip title="Highlight">
            <FormatColorFill fontSize="small" />
          </Tooltip>
        </IconButton>

        <Divider orientation="vertical" flexItem />

        {/* Lists and Blocks */}
        <ToggleButtonGroup size="small">
          <ToggleButton
            value="unordered-list-item"
            selected={isBlockTypeActive("unordered-list-item")}
            onChange={() => handleBlockType("unordered-list-item")}
          >
            <Tooltip title="Bullet List">
              <FormatListBulleted fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="ordered-list-item"
            selected={isBlockTypeActive("ordered-list-item")}
            onChange={() => handleBlockType("ordered-list-item")}
          >
            <Tooltip title="Numbered List">
              <FormatListNumbered fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="blockquote"
            selected={isBlockTypeActive("blockquote")}
            onChange={() => handleBlockType("blockquote")}
          >
            <Tooltip title="Quote">
              <FormatQuote fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton
            value="code-block"
            selected={isBlockTypeActive("code-block")}
            onChange={() => handleBlockType("code-block")}
          >
            <Tooltip title="Code Block">
              <Code fontSize="small" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Media */}
        <ToggleButtonGroup size="small">
          <ToggleButton value="link" onChange={handleAddLink}>
            <Tooltip title="Add Link (Ctrl+K)">
              <LinkIcon fontSize="small" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="image" onChange={handleAddImage}>
            <Tooltip title="Add Image">
              <ImageIcon fontSize="small" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Editor */}
      <Box
        sx={{
          ...editorStyles.editor,
          minHeight: `${minHeight}px`,
          cursor: "text",
        }}
        onClick={focusEditor}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder={placeholder}
          readOnly={readOnly}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={(block) => blockStyleMap[block.getType() as keyof typeof blockStyleMap]}
          customStyleMap={inlineStyleMap}
          blockRendererFn={blockRendererFn}
        />
      </Box>

      {/* Color Menu */}
      <Menu anchorEl={colorMenuAnchor} open={Boolean(colorMenuAnchor)} onClose={() => setColorMenuAnchor(null)}>
        <Box sx={{ p: 2, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 1, maxWidth: 200 }}>
          {colors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 20,
                height: 20,
                backgroundColor: color,
                border: "1px solid #ccc",
                cursor: "pointer",
                borderRadius: 1,
              }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </Box>
      </Menu>

      {/* Highlight Menu */}
      <Menu
        anchorEl={highlightMenuAnchor}
        open={Boolean(highlightMenuAnchor)}
        onClose={() => setHighlightMenuAnchor(null)}
      >
        <Box sx={{ p: 2, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 1, maxWidth: 200 }}>
          {colors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 20,
                height: 20,
                backgroundColor: color,
                border: "1px solid #ccc",
                cursor: "pointer",
                borderRadius: 1,
              }}
              onClick={() => handleHighlightChange(color)}
            />
          ))}
        </Box>
      </Menu>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmLink} variant="contained" disabled={!linkUrl.trim()}>
            Add Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmImage} variant="contained" disabled={!imageUrl.trim()}>
            Add Image
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

// Image component for rendering images in the editor
const ImageComponent = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()

  return (
    <Box sx={{ textAlign: "center", my: 2 }}>
      <img
        src={src || "/placeholder.svg"}
        alt="Inserted"
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
    </Box>
  )
}

export default RichTextEditor
