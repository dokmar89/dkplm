import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  XCircleIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { 
  getRegistrationRequests, 
  approveRegistrationRequest, 
  rejectRegistrationRequest 
} from '../../services/registrationService';
import type { RegistrationRequest } from '../../types/registration';

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const RegistrationRequestList = () => {
  const [requests, setRequests] = useState<Array<RegistrationRequest & { id: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<(RegistrationRequest & { id: string }) | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getRegistrationRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: RegistrationRequest & { id: string }) => {
    try {
      setProcessing(true);
      await approveRegistrationRequest(request.id);
      await fetchRequests();
    } catch (error) {
      console.error('Failed to approve request:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      await rejectRegistrationRequest(selectedRequest.id, rejectionReason);
      setShowRejectionDialog(false);
      setRejectionReason('');
      setSelectedRequest(null);
      await fetchRequests();
    } catch (error) {
      console.error('Failed to reject request:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Žádosti o registraci</h2>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold">{request.companyName}</h3>
                </div>
                <div className="text-sm text-gray-500">
                  IČO: {request.ico} | DIČ: {request.dic}
                </div>
              </div>
              <StatusBadge status={request.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {request.address.street}, {request.address.city},{' '}
                    {request.address.zip}, {request.address.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{request.contactPerson.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{request.contactPerson.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Kontaktní osoba:</span>{' '}
                  {request.contactPerson.firstName} {request.contactPerson.lastName}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Datum žádosti:</span>{' '}
                  {format(request.submittedAt.toDate(), 'PPP', { locale: cs })}
                </div>
              </div>
            </div>

            {request.status === 'pending' && (
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowRejectionDialog(true);
                  }}
                  disabled={processing}
                >
                  <XCircleIcon className="w-4 h-4 mr-2" />
                  Zamítnout
                </Button>
                <Button
                  onClick={() => handleApprove(request)}
                  disabled={processing}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Schválit
                </Button>
              </div>
            )}

            {request.status === 'rejected' && request.rejectionReason && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                <span className="font-medium">Důvod zamítnutí:</span> {request.rejectionReason}
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Žádné žádosti o registraci k vyřízení
          </div>
        )}
      </div>

      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zamítnutí žádosti</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Důvod zamítnutí</Label>
              <Input
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Zadejte důvod zamítnutí žádosti"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectionDialog(false);
                setRejectionReason('');
                setSelectedRequest(null);
              }}
            >
              Zrušit
            </Button>
            <Button
              onClick={handleReject}
              disabled={!rejectionReason.trim() || processing}
            >
              Zamítnout žádost
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
