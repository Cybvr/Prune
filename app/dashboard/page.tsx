'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { DocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

type Document = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
};

const DashboardPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const statuses = ["Backlog", "Planned", "In Progress", "Completed", "Canceled"];
  const priorities = ["No Priority", "Low", "Medium", "High", "Urgent"];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchDocuments(user.uid).catch(error => {
          console.error('Error fetching documents:', error);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDocuments = async (uid: string) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, 'documents'),
        where('userId', '==', uid)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          status: data.status,
          priority: data.priority,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        } as Document;
      });
      setDocuments(docs.slice(0, 3)); // Display only the first 3 documents
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    return statuses.map(status => ({
      name: status,
      count: documents.filter(doc => doc.status === status).length,
    }));
  };

  const getPriorityCounts = () => {
    return priorities.map(priority => ({
      name: priority,
      count: documents.filter(doc => doc.priority === priority).length,
    }));
  };

  const statusCounts = getStatusCounts();
  const priorityCounts = getPriorityCounts();

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold text-foreground mb-2">Hi, Welcome back</h1>
      <p className="text-sm text-muted-foreground mb-8">Here's a summary of your recent documents.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Status of Your Documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <BarChart width={300} height={200} data={statusCounts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority</CardTitle>
            <CardDescription>Priority of Your Documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <BarChart width={300} height={200} data={priorityCounts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--secondary))" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your most recently updated documents</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color="hsl(var(--primary))" size={50} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={doc.id} className={index !== documents.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/documents/${doc.id}`}
                          className="text-primary hover:text-primary-hover flex items-center"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full mr-3">
                            <DocumentIcon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{doc.title}</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-destructive hover:text-destructive-hover transition-colors">
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;