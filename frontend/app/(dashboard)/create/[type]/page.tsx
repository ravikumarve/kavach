"use client"

import { useState } from "react"
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
import { ArrowLeft, Loader2, FileText } from "lucide-react"
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
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Chennai",
  "Bangalore",
  "Hyderabad",
]

export default function CreateDocumentTypePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const docType = params.type as DocumentType

  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    // Party A
    partyAName: "",
    partyAType: "individual",
    partyAAddress: "",
    partyAState: "",
    partyAPan: "",
    partyAGst: "",

    // Party B
    partyBName: "",
    partyBType: "individual",
    partyBAddress: "",
    partyBState: "",
    partyBPan: "",
    partyBGst: "",

    // Document Details
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

  if (!session) {
    return null
  }

  const handleBack = () => {
    router.push("/dashboard/create")
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      // TODO: Call backend API to generate document
      // const response = await fetch('/api/v1/generate/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     doc_type: docType,
      //     party_a: {
      //       name: formData.partyAName,
      //       type: formData.partyAType,
      //       address: formData.partyAAddress,
      //       state: formData.partyAState,
      //       pan: formData.partyAPan,
      //       gst: formData.partyAGst,
      //     },
      //     party_b: {
      //       name: formData.partyBName,
      //       type: formData.partyBType,
      //       address: formData.partyBAddress,
      //       state: formData.partyBState,
      //       pan: formData.partyBPan,
      //       gst: formData.partyBGst,
      //     },
      //     document_details: {
      //       title: formData.title,
      //       effective_date: formData.effectiveDate,
      //       jurisdiction: formData.jurisdiction,
      //       include_gst: formData.includeGst,
      //       msme_protected: formData.msmeProtected,
      //       additional_terms: formData.additionalTerms,
      //     },
      //   }),
      // })

      // if (response.ok) {
      //   const data = await response.json()
      //   router.push(`/dashboard/documents/${data.data.document.id}`)
      // } else {
      //   console.error('Failed to generate document')
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard/documents")
    } catch (error) {
      console.error("Error generating document:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-4 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Document Types
            </Button>
            <h1 className="text-3xl font-bold mb-2 text-white">
              {documentTypeLabels[docType] || "Create Document"}
            </h1>
            <p className="text-gray-400">
              Fill in the details below to generate your document
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Document Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter the information for your document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Party A */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Party A</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partyAName">Name</Label>
                      <Input
                        id="partyAName"
                        value={formData.partyAName}
                        onChange={(e) =>
                          setFormData({ ...formData, partyAName: e.target.value })
                        }
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAType">Type</Label>
                      <Select
                        value={formData.partyAType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, partyAType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="partyAAddress">Address</Label>
                      <Textarea
                        id="partyAAddress"
                        value={formData.partyAAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, partyAAddress: e.target.value })
                        }
                        placeholder="Enter address"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAState">State</Label>
                      <Select
                        value={formData.partyAState}
                        onValueChange={(value) =>
                          setFormData({ ...formData, partyAState: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyAPan">PAN (Optional)</Label>
                      <Input
                        id="partyAPan"
                        value={formData.partyAPan}
                        onChange={(e) =>
                          setFormData({ ...formData, partyAPan: e.target.value })
                        }
                        placeholder="Enter PAN"
                      />
                    </div>
                    {formData.partyAType === "company" && (
                      <div className="space-y-2">
                        <Label htmlFor="partyAGst">GST (Optional)</Label>
                        <Input
                          id="partyAGst"
                          value={formData.partyAGst}
                          onChange={(e) =>
                            setFormData({ ...formData, partyAGst: e.target.value })
                          }
                          placeholder="Enter GST"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Party B */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Party B</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partyBName">Name</Label>
                      <Input
                        id="partyBName"
                        value={formData.partyBName}
                        onChange={(e) =>
                          setFormData({ ...formData, partyBName: e.target.value })
                        }
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBType">Type</Label>
                      <Select
                        value={formData.partyBType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, partyBType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="partyBAddress">Address</Label>
                      <Textarea
                        id="partyBAddress"
                        value={formData.partyBAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, partyBAddress: e.target.value })
                        }
                        placeholder="Enter address"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBState">State</Label>
                      <Select
                        value={formData.partyBState}
                        onValueChange={(value) =>
                          setFormData({ ...formData, partyBState: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partyBPan">PAN (Optional)</Label>
                      <Input
                        id="partyBPan"
                        value={formData.partyBPan}
                        onChange={(e) =>
                          setFormData({ ...formData, partyBPan: e.target.value })
                        }
                        placeholder="Enter PAN"
                      />
                    </div>
                    {formData.partyBType === "company" && (
                      <div className="space-y-2">
                        <Label htmlFor="partyBGst">GST (Optional)</Label>
                        <Input
                          id="partyBGst"
                          value={formData.partyBGst}
                          onChange={(e) =>
                            setFormData({ ...formData, partyBGst: e.target.value })
                          }
                          placeholder="Enter GST"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Document Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Document Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Enter document title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input
                        id="effectiveDate"
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) =>
                          setFormData({ ...formData, effectiveDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jurisdiction">Jurisdiction</Label>
                      <Select
                        value={formData.jurisdiction}
                        onValueChange={(value) =>
                          setFormData({ ...formData, jurisdiction: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="additionalTerms">
                        Additional Terms (Optional)
                      </Label>
                      <Textarea
                        id="additionalTerms"
                        value={formData.additionalTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalTerms: e.target.value,
                          })
                        }
                        placeholder="Enter any additional terms or conditions"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Document...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Document Preview</CardTitle>
                <CardDescription className="text-gray-400">
                  Preview of your document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 min-h-[500px] text-gray-900">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {formData.title || "DOCUMENT TITLE"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {documentTypeLabels[docType]}
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <strong>Party A:</strong>
                      <p className="mt-1">
                        {formData.partyAName || "Party A Name"}
                        <br />
                        {formData.partyAAddress || "Party A Address"}
                        <br />
                        {formData.partyAState || "State"}
                      </p>
                    </div>

                    <div>
                      <strong>Party B:</strong>
                      <p className="mt-1">
                        {formData.partyBName || "Party B Name"}
                        <br />
                        {formData.partyBAddress || "Party B Address"}
                        <br />
                        {formData.partyBState || "State"}
                      </p>
                    </div>

                    <div>
                      <strong>Effective Date:</strong>
                      <p className="mt-1">
                        {formData.effectiveDate || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <strong>Jurisdiction:</strong>
                      <p className="mt-1">
                        {formData.jurisdiction || "Not specified"}
                      </p>
                    </div>

                    {formData.additionalTerms && (
                      <div>
                        <strong>Additional Terms:</strong>
                        <p className="mt-1">{formData.additionalTerms}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
