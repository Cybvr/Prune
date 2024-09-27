import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';

type MyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  onSubmit: (description: string) => void;
};

const MyDialog: React.FC<MyDialogProps> = ({ open, onOpenChange, title, subtitle, onSubmit }) => {
  const [description, setDescription] = useState('');
  const { theme } = useTheme();

  const handleGenerate = () => {
    if (description.trim() === '') {
      alert('Please enter a description');
      return;
    }
    onSubmit(description);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} className={`dialog-${theme}`}>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                </div>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MyDialog;