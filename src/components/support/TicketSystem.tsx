import React, { useState } from 'react';
import { LifeBuoy, Paperclip } from 'lucide-react';
import { Button } from '../ui/Button';

const categories = [
  'Technical Issue',
  'Account Problem',
  'Integration Help',
  'Billing Question',
  'Feature Request',
  'Other',
];

export const TicketSystem = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
    attachments: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Submitting ticket:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...Array.from(e.target.files)],
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow col-span-2">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <LifeBuoy className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">Submit a Support Ticket</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attachments</label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Add Files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            {formData.attachments.length > 0 && (
              <span className="text-sm text-gray-500">
                {formData.attachments.length} file(s) selected
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit Ticket</Button>
        </div>
      </form>
    </div>
  );
};