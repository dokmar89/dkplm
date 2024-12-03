import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'What verification methods are available?',
    answer: 'We offer three main verification methods: BankID, MojeID, and OCR document scanning.',
  },
  {
    question: 'How long does verification typically take?',
    answer: 'Most verifications are completed within 30 seconds to 2 minutes, depending on the chosen method.',
  },
  {
    question: 'What happens if verification fails?',
    answer: 'Users can retry verification using the same or different method. Failed attempts are logged and can be reviewed in the dashboard.',
  },
  {
    question: 'How secure is the verification process?',
    answer: 'We use bank-grade security protocols and comply with GDPR and other relevant data protection regulations.',
  },
];

export const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow col-span-3">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">Frequently Asked Questions</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <span className="font-medium">{item.question}</span>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {openItem === index && (
                <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};