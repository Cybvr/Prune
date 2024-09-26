'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-card rounded-lg p-6 mb-6">
    <h2 className="text-lg font-semibold mb-4 text-card-foreground">{title}</h2>
    {children}
  </div>
)

const ProfileSection: React.FC<{ user: any; onSave: () => void }> = ({ user, onSave }) => {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  return (
    <Card title="Profile Information">
      <form onSubmit={(e) => { e.preventDefault(); onSave() }} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="avatar" className="text-card-foreground">Profile Picture</Label>
          <div className="flex items-center space-x-4">
            <Image
              src={user?.avatar_url || '/placeholder.svg?height=100&width=100'}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border border-border"
            />
            <Button variant="outline" className="text-card-foreground border-border">Change</Button>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="name" className="text-card-foreground">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border bg-muted text-card-foreground"
            />
          </div>
          <div className="space-y-2 flex-1">
            <Label htmlFor="email" className="text-card-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border bg-muted text-card-foreground"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-muted text-card-foreground border-border">Save Changes</Button>
        </div>
      </form>
    </Card>
  )
}

const PreferencesSection: React.FC<{ preferences: any; onToggle: (key: string) => void }> = ({ preferences, onToggle }) => (
  <Card title="Preferences">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications" className="text-card-foreground">Notifications</Label>
          <p className="text-sm text-muted-foreground">Receive email notifications</p>
        </div>
        <Switch
          id="notifications"
          checked={preferences.notifications}
          onCheckedChange={() => onToggle('notifications')}
          className="bg-muted text-primary border-border"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="darkMode" className="text-card-foreground">Dark Mode</Label>
          <p className="text-sm text-muted-foreground">Toggle dark mode</p>
        </div>
        <Switch
          id="darkMode"
          checked={preferences.darkMode}
          onCheckedChange={() => onToggle('darkMode')}
          className="bg-muted text-primary border-border"
        />
      </div>
    </div>
  </Card>
)

const AccountActionsSection: React.FC<{ onDeleteAccount: () => void }> = ({ onDeleteAccount }) => (
  <Card title="Account Actions">
    <div className="space-y-4">
      <Button variant="destructive" onClick={onDeleteAccount} className="bg-destructive text-destructive-foreground">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Account
      </Button>
    </div>
  </Card>
)

const AccountSettingsPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      // Simulate fetching user data from an API
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        avatar_url: '/placeholder.svg?height=100&width=100',
      }
      setUser(mockUser)
      setPreferences({
        notifications: true,
        darkMode: false,
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true)
      // Simulate updating user data
      console.log('Updating user profile')
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTogglePreference = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = async () => {
    try {
      // Simulate logout
      console.log('Logging out')
      // In a real application, you would clear the user's session here
      alert('Logged out successfully!')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Simulate account deletion
        console.log('Deleting account')
        // In a real application, you would send a request to your backend to delete the account
        alert('Account deleted successfully!')
      } catch (error) {
        console.error('Error deleting account:', error)
        alert('Failed to delete account. Please try again.')
      }
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-primary-foreground">Loading...</div>
  }

  return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <p className="text-sm text-muted-foreground mb-6">Manage your account preferences and information</p>
      <ProfileSection user={user} onSave={handleSaveProfile} />
      <PreferencesSection preferences={preferences} onToggle={handleTogglePreference} />
      <AccountActionsSection onDeleteAccount={handleDeleteAccount} />
      <div className="flex justify-end mb-6">
        <Button variant="outline" onClick={handleLogout} className="text-primary-foreground border-border">Log Out</Button>
      </div>
    </div>
  )
}

export default AccountSettingsPage