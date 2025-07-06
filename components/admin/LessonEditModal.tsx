// components/admin/LessonEditModal.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface Lesson {
  id: number;
  title: string;
  video_url: string;
  content: string;
  order: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (updatedLesson: Lesson) => void;
  lesson: Lesson | null;
}

const LessonEditModal = ({ open, onClose, onSave, lesson }: Props) => {
  const [form, setForm] = useState({
    title: '',
    video_url: '',
    content: '',
    order: '',
  });

  useEffect(() => {
    if (lesson) {
      setForm({
        title: lesson.title,
        video_url: lesson.video_url,
        content: lesson.content,
        order: lesson.order.toString(),
      });
    }
  }, [lesson]);

  const handleSubmit = () => {
    if (lesson) {
      onSave({
        ...lesson,
        title: form.title,
        video_url: form.video_url,
        content: form.content,
        order: Number(form.order),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Lesson</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Video URL"
          value={form.video_url}
          onChange={(e) => setForm({ ...form, video_url: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Order"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          fullWidth
          multiline
          rows={4}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonEditModal;
