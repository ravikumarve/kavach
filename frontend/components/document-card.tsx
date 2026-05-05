import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Trash2 } from "lucide-react"
import { DocumentStatus, DocumentType } from "@/types/document"

interface DocumentCardProps {
  id: string
  title: string
  type: DocumentType
  status: DocumentStatus
  createdAt: string
  updatedAt: string
  onView?: () => void
  onDownload?: () => void
  onDelete?: () => void
}

export function DocumentCard({
  id,
  title,
  type,
  status,
  createdAt,
  updatedAt,
  onView,
  onDownload,
  onDelete,
}: DocumentCardProps) {
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.DRAFT:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case DocumentStatus.GENERATING:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case DocumentStatus.COMPLETED:
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case DocumentStatus.FAILED:
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeLabel = (type: DocumentType) => {
    switch (type) {
      case DocumentType.NDA:
        return "NDA"
      case DocumentType.FREELANCE_CONTRACT:
        return "Freelance Contract"
      case DocumentType.RENT_AGREEMENT:
        return "Rent Agreement"
      case DocumentType.VENDOR_AGREEMENT:
        return "Vendor Agreement"
      case DocumentType.OFFER_LETTER:
        return "Offer Letter"
      case DocumentType.PARTNERSHIP_DEED:
        return "Partnership Deed"
      case DocumentType.SERVICE_AGREEMENT:
        return "Service Agreement"
      case DocumentType.CONSULTANT_AGREEMENT:
        return "Consultant Agreement"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg text-white">{title}</CardTitle>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Type:</span>
          <span className="text-gray-300">{getTypeLabel(type)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Created:</span>
          <span className="text-gray-300">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-gray-300">
            {new Date(updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          )}
          {onDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
