"use client"

import { useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, FileText, Download, CheckCircle } from "lucide-react"
import { DocumentType } from "@/types/document"

const documentTypeLabels: Record<DocumentType, string> = {
  [DocumentType.NDA]: "Non-Disclosure Agreement",
  [DocumentType.FREELANCE_CONTRACT]: "Freelance Contract",
  [DocumentType.RENT_AGREEMENT]: "Rent Agreement",
  [DocumentType.VENDOR_AGREEMENT]: "Vendor Agreement",
  [DocumentType.OFFER_LETTER]: "Offer Letter",
  [DocumentType.PARTNERSHIP_DEED]: "Partnership Deed",
  [DocumentType.SERVICE_AGREEMENT]: "Service Agreement",
  [DocumentType.CONSULTANT_AGREEMENT]: "Consultant Agreement",
}

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad",
]

export default function CreateDocumentTypePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const docType = params.type as DocumentType
  const previewRef = useRef<HTMLIFrameElement>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDoc, setGeneratedDoc] = useState<{
    id: string
    html: string
    pdfPath: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    partyAName: "",
    partyAType: "individual",
    partyAAddress: "",
    partyAState: "",
    partyAPan: "",
    partyAGst: "",
    partyBName: "",
    partyBType: "individual",
    partyBAddress: "",
    partyBState: "",
    partyBPan: "",
    partyBGst: "",
    title: "",
    effectiveDate: "",
    jurisdiction: "",
    includeGst: false,
    msmeProtected: false,
    additionalTerms: "",
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const handleBack = () => router.push("/create")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedDoc(null)

    try {
      const payload = {
        title: formData.title || `${documentTypeLabels[docType] || "Document"}`,
        party_a_name: formData.partyAName,
        party_a_type: formData.partyAType,
        party_a_address: formData.partyAAddress,
        party_a_state: formData.partyAState,
        party_a_pan: formData.partyAPan,
        party_a_gst: formData.partyAGst,
        party_b_name: formData.partyBName,
        party_b_type: formData.partyBType,
        party_b_address: formData.partyBAddress,
        party_b_state: formData.partyBState,
        party_b_pan: formData.partyBPan,
        party_b_gst: formData.partyBGst,
        effective_date: formData.effectiveDate,
        jurisdiction: formData.jurisdiction,
        include_gst: formData.includeGst,
        msme_protected: formData.msmeProtected,
        additional_terms: formData.additionalTerms,
      }

      const response = await fetch(`/api/v1/generate/?doc_type=${docType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate document")
      }

      setGeneratedDoc({
        id: data.data.document.id,
        html: data.data.document.content_html,
        pdfPath: data.data.document.pdf_path,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed")
      console.error("Generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!generatedDoc) return
    try {
      const response = await fetch(`/api/v1/export/pdf/${generatedDoc.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error("Download failed")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${formData.title || "document"}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Download error:", err)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={handleBack} className="mb-4 text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Document Types
            </Button>
            <h1 className="text-3xl font-bold mb-2 text-white">
              {documentTypeLabels[docType] || "Create Document"}
            </h1>
            <p className="text-gray-400">Fill in the details below to generate your document</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Success Banner */}
          {generatedDoc && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>Document generated successfully!</span>
              </div>
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20">
              <CardHeader>
                <CardTitle className="text-white">Document Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter the information for your document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Party A */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Party A (You)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partyAName">Name</Label>
                      <Input id="partyAName" value={formData.partyAName} onChange={(e) => setFormData({ ...formData, partyAName: e.target.value })} placeholder="Enter name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAType">Type</Label>
                      <Select value={formData.partyAType} onValueChange={(v) => setFormData({ ...formData, partyAType: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="partyAAddress">Address</Label>
                      <Textarea id="partyAAddress" value={formData.partyAAddress} onChange={(e) => setFormData({ ...formData, partyAAddress: e.target.value })} placeholder="Enter address" rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAState">State</Label>
                      <Select value={formData.partyAState} onValueChange={(v) => setFormData({ ...formData, partyAState: v })}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (<SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAPan">PAN (Optional)</Label>
                      <Input id="partyAPan" value={formData.partyAPan} onChange={(e) => setFormData({ ...formData, partyAPan: e.target.value })} placeholder="Enter PAN" />
                    </div>
                    {formData.partyAType === "company" && (
                      <div className="space-y-2">
                        <Label htmlFor="partyAGst">GST (Optional)</Label>
                        <Input id="partyAGst" value={formData.partyAGst} onChange={(e) => setFormData({ ...formData, partyAGst: e.target.value })} placeholder="Enter GST" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Party B */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Party B (Counterparty)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partyBName">Name</Label>
                      <Input id="partyBName" value={formData.partyBName} onChange={(e) => setFormData({ ...formData, partyBName: e.target.value })} placeholder="Enter name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBType">Type</Label>
                      <Select value={formData.partyBType} onValueChange={(v) => setFormData({ ...formData, partyBType: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="partyBAddress">Address</Label>
                      <Textarea id="partyBAddress" value={formData.partyBAddress} onChange={(e) => setFormData({ ...formData, partyBAddress: e.target.value })} placeholder="Enter address" rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBState">State</Label>
                      <Select value={formData.partyBState} onValueChange={(v) => setFormData({ ...formData, partyBState: v })}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (<SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBPan">PAN (Optional)</Label>
                      <Input id="partyBPan" value={formData.partyBPan} onChange={(e) => setFormData({ ...formData, partyBPan: e.target.value })} placeholder="Enter PAN" />
                    </div>
                    {formData.partyBType === "company" && (
                      <div className="space-y-2">
                        <Label htmlFor="partyBGst">GST (Optional)</Label>
                        <Input id="partyBGst" value={formData.partyBGst} onChange={(e) => setFormData({ ...formData, partyBGst: e.target.value })} placeholder="Enter GST" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Document Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Document Title</Label>
                      <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter document title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input id="effectiveDate" type="date" value={formData.effectiveDate} onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jurisdiction">Jurisdiction</Label>
                      <Select value={formData.jurisdiction} onValueChange={(v) => setFormData({ ...formData, jurisdiction: v })}>
                        <SelectTrigger><SelectValue placeholder="Select jurisdiction" /></SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (<SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                      <Textarea id="additionalTerms" value={formData.additionalTerms} onChange={(e) => setFormData({ ...formData, additionalTerms: e.target.value })} placeholder="Enter any additional terms or conditions" rows={3} />
                    </div>
                  </div>
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  {isGenerating ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating Document...</>
                  ) : (
                    <><FileText className="h-4 w-4 mr-2" /> Generate Document</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Live Preview</CardTitle>
                    <CardDescription className="text-gray-400">
                      {generatedDoc ? "AI-generated document preview" : "Preview will appear here after generation"}
                    </CardDescription>
                  </div>
                  {generatedDoc && (
                    <Button onClick={handleDownloadPDF} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedDoc ? (
                  <div className="bg-white rounded-lg overflow-hidden" style={{ height: "600px" }}>
                    <iframe
                      ref={previewRef}
                      srcDoc={generatedDoc.html}
                      className="w-full h-full"
                      style={{ border: "none" }}
                      title="Document Preview"
                      sandbox="allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg p-6 min-h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-indigo-400/50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-400 mb-2">No Document Yet</h3>
                      <p className="text-gray-500 text-sm max-w-md">
                        Fill in the form and click "Generate Document" to see a live preview of your AI-generated legal document here.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
