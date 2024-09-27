'use client'
import React, { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DocumentIcon,
  ListBulletIcon,
  ClipboardIcon,
  BriefcaseIcon,
  ChartBarIcon,
  PencilIcon,
  LightBulbIcon,
  BookOpenIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import MyDialog from '@/components/ui/MyDialog';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

type CategoryItem = {
  title: string;
  subtitle: string; // Add subtitle to CategoryItem
  icon: React.ReactNode;
};

const TileCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}> = ({ title, subtitle, icon, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer border rounded-lg p-4 flex items-center space-x-4 ${
      selected ? 'border-primary' : 'border-muted'
    } hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full text-primary"> {/* Small circle for icon */}
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

const TemplatePage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogSubtitle, setDialogSubtitle] = useState('');
  const router = useRouter();

  const categories: Record<string, CategoryItem[]> = {
    All: [
      { title: 'Summarize text', subtitle: 'Get a brief summary', icon: <DocumentIcon className="h-4 w-4" /> },
      { title: 'List action items', subtitle: 'Create a task list', icon: <ListBulletIcon className="h-4 w-4" /> },
      { title: 'Create a to-do list', subtitle: 'Organize your tasks', icon: <ClipboardIcon className="h-4 w-4" /> },
      { title: 'Draft a meeting Agenda', subtitle: 'Prepare your meetings', icon: <ClipboardIcon className="h-4 w-4" /> },
      { title: 'Create a Job Proposal', subtitle: 'Draft a job proposal', icon: <BriefcaseIcon className="h-4 w-4" /> },
      { title: 'Write a Business Plan draft', subtitle: 'Create a business plan', icon: <ClipboardIcon className="h-4 w-4" /> },
      { title: 'Elevator Pitch', subtitle: 'Write an elevator pitch', icon: <LightBulbIcon className="h-4 w-4" /> },
      { title: 'Write a Poem', subtitle: 'Create a poem', icon: <PencilIcon className="h-4 w-4" /> },
      { title: 'Write a Short Story Draft', subtitle: 'Draft a short story', icon: <BookOpenIcon className="h-4 w-4" /> },
      { title: 'Get SEO Guides', subtitle: 'Improve SEO strategy', icon: <HashtagIcon className="h-4 w-4" /> },
      { title: 'Create a Blog Post', subtitle: 'Write a blog entry', icon: <ChartBarIcon className="h-4 w-4" /> },
    ],
    Productivity: [
      { title: 'Summarize text', subtitle: 'Get a brief summary', icon: <DocumentIcon className="h-4 w-4" /> },
      { title: 'List action items', subtitle: 'Create a task list', icon: <ListBulletIcon className="h-4 w-4" /> },
      { title: 'Create a to-do list', subtitle: 'Organize your tasks', icon: <ClipboardIcon className="h-4 w-4" /> },
      { title: 'Draft a meeting Agenda', subtitle: 'Prepare your meetings', icon: <ClipboardIcon className="h-4 w-4" /> },
    ],
    Business: [
      { title: 'Create a Job Proposal', subtitle: 'Draft a job proposal', icon: <BriefcaseIcon className="h-4 w-4" /> },
      { title: 'Write a Business Plan draft', subtitle: 'Create a business plan', icon: <ClipboardIcon className="h-4 w-4" /> },
      { title: 'Elevator Pitch', subtitle: 'Write an elevator pitch', icon: <LightBulbIcon className="h-4 w-4" /> },
    ],
    Art: [
      { title: 'Write a Poem', subtitle: 'Create a poem', icon: <PencilIcon className="h-4 w-4" /> },
      { title: 'Write a Short Story Draft', subtitle: 'Draft a short story', icon: <BookOpenIcon className="h-4 w-4" /> },
    ],
    Marketing: [
      { title: 'Get SEO Guides', subtitle: 'Improve SEO strategy', icon: <HashtagIcon className="h-4 w-4" /> },
      { title: 'Create a Blog Post', subtitle: 'Write a blog entry', icon: <ChartBarIcon className="h-4 w-4" /> },
    ],
  };

  const filteredItems = useMemo(() => {
    const activeItems = activeTab === 'All' ? categories.All : categories[activeTab];
    return activeItems.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, activeTab]);

  const handleTileClick = (title: string) => {
    setSelectedItem(title);
    setDialogTitle(title);
    setDialogSubtitle(`Describe what you want for ${title.toLowerCase()}`); // Set subtitle dynamically based on the title
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (description: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      const newDoc = {
        title: dialogTitle,
        content: data.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'documents'), newDoc);

      router.push(`/dashboard/documents/${docRef.id}`);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Templates</h1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs defaultValue="All" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="flex space-x-2">
            {Object.keys(categories).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {filteredItems.map((item) => (
              <TileCard
                key={item.title}
                title={item.title}
                subtitle={item.subtitle} // Pass subtitle to TileCard
                icon={item.icon}
                selected={selectedItem === item.title}
                onClick={() => handleTileClick(item.title)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <MyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={dialogTitle}
        subtitle={dialogSubtitle} // Pass the subtitle to the dialog
        onSubmit={handleDialogSubmit} // Handle the dialog submit event
      />
    </div>
  );
};

export default TemplatePage;