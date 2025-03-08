"use client"

import type React from "react"

import { useState } from "react"
import { FileCheck, FilePlus, FileText, FileX, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentDashboardHeader } from "@/components/student-dashboard-header"

// Mock data for documents
const initialDocuments = [
  {
    id: 1,
    name: "Academic Transcript",
    type: "PDF",
    size: "1.2 MB",
    status: "verified",
    date: "May 10, 2025",
    hash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
  },
  {
    id: 2,
    name: "Letter of Recommendation",
    type: "PDF",
    size: "0.8 MB",
    status: "pending",
    date: "May 15, 2025",
    hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  },
  {
    id: 3,
    name: "Certificate of Achievement",
    type: "PDF",
    status: "rejected",
    size: "1.5 MB",
    date: "May 5, 2025",
    hash: "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile || !documentType) return

    setIsUploading(true)

    // Simulate upload to IPFS
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: documentType,
        type: selectedFile.name.split(".").pop()?.toUpperCase() || "PDF",
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        status: "pending",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        hash: `QmRandom${Math.random().toString(36).substring(2, 10)}`,
      }

      setDocuments([...documents, newDocument])
      setSelectedFile(null)
      setDocumentType("")
      setIsUploading(false)
    }, 2000) 
  }

  return (
    <div className="flex flex-col">
      <StudentDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload your academic documents for verification. Supported formats: PDF, JPG, PNG.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic Transcript">Academic Transcript</SelectItem>
                      <SelectItem value="Letter of Recommendation">Letter of Recommendation</SelectItem>
                      <SelectItem value="Certificate of Achievement">Certificate of Achievement</SelectItem>
                      <SelectItem value="Resume/CV">Resume/CV</SelectItem>
                      <SelectItem value="Personal Statement">Personal Statement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                  {selectedFile && (
                    <p className="text-xs text-muted-foreground">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleUpload} disabled={!selectedFile || !documentType || isUploading}>
                  {isUploading ? "Uploading..." : "Upload to IPFS"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>Documents are stored on IPFS and verified using blockchain technology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    {doc.status === "verified" ? (
                      <FileCheck className="h-8 w-8 text-green-500" />
                    ) : doc.status === "rejected" ? (
                      <FileX className="h-8 w-8 text-red-500" />
                    ) : (
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.date}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[300px]">IPFS Hash: {doc.hash}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === "verified" ? (
                      <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                        Verified
                      </div>
                    ) : doc.status === "rejected" ? (
                      <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
                        Rejected
                      </div>
                    ) : (
                      <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500">
                        Pending
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}

              {documents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FilePlus className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Upload your academic documents to apply for scholarships
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Documents are verified within 24-48 hours after upload
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

