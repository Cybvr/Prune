import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

type MyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  onSubmit: (description: string) => Promise<void>;
};

const MyDialog: React.FC<MyDialogProps> = ({ open, onOpenChange, title, subtitle, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();

  const handleGenerate = async () => {
    if (description.trim() === '') {
      alert('Please enter a description');
      return;
    }
    setIsGenerating(true);
    try {
      await onSubmit(description);
      onOpenChange(false);
    } catch (error) {
      console.error('Error generating and saving content:', error); // Ensure error is logged
      alert('An error occurred while generating and saving content');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`dialog-${theme}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4 p-2 border rounded w-full"
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
          <DialogClose asChild>
            <button className="ml-2">Cancel</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;