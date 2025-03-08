import { FileCheck, FileText, GraduationCap, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StudentApplicationDetailsProps {
  application: {
    id: number
    student: {
      name: string
      avatar: string
      university: string
      major: string
      gpa: string
    }
    scholarship: string
    appliedDate: string
    status: string
  }
}

export function StudentApplicationDetails({ application }: StudentApplicationDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={application.student.avatar} alt={application.student.name} />
          <AvatarFallback>{application.student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{application.student.name}</h3>
          <p className="text-sm text-muted-foreground">
            {application.student.university} • {application.student.major}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="outline">GPA: {application.student.gpa}</Badge>
            <Badge variant="secondary">{application.scholarship}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Application
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
              <CardDescription>Personal and academic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Full Name</div>
                  <div>{application.student.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">University</div>
                  <div>{application.student.university}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Major</div>
                  <div>{application.student.major}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">GPA</div>
                  <div>{application.student.gpa}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Year</div>
                  <div>Junior</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Expected Graduation</div>
                  <div>May 2026</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Achievements</CardTitle>
              <CardDescription>Awards and recognitions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dean's List (Fall 2023, Spring 2024)</li>
                <li>First Place, University Hackathon 2024</li>
                <li>Member, Honor Society</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verified Documents</CardTitle>
              <CardDescription>Academic records and certificates stored on IPFS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Academic Transcript",
                  type: "PDF",
                  size: "1.2 MB",
                  verified: true,
                  date: "May 10, 2025",
                  hash: "Qm...",
                },
                {
                  name: "Letter of Recommendation",
                  type: "PDF",
                  size: "0.8 MB",
                  verified: true,
                  date: "May 8, 2025",
                  hash: "Qm...",
                },
                {
                  name: "Certificate of Achievement",
                  type: "PDF",
                  size: "1.5 MB",
                  verified: true,
                  date: "May 5, 2025",
                  hash: "Qm...",
                },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.verified && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        <FileCheck className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Application</CardTitle>
              <CardDescription>Details submitted for {application.scholarship}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Application Date</div>
                <div>{application.appliedDate}</div>
              </div>

              <div>
                <div className="text-sm font-medium">Personal Statement</div>
                <div className="mt-1 rounded-md border p-3 text-sm">
                  As a dedicated computer science student with a passion for innovation, I am applying for the
                  Engineering Excellence Scholarship to further my education and research in artificial intelligence.
                  Throughout my academic journey, I have maintained a strong GPA while participating in various
                  hackathons and research projects. My goal is to develop AI solutions that address real-world
                  challenges in healthcare and education.
                  <br />
                  <br />
                  With the support of this scholarship, I plan to focus on my senior project developing a decentralized
                  learning platform that uses blockchain technology to verify educational credentials. This scholarship
                  would allow me to dedicate more time to this research without financial constraints.
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Future Goals</div>
                <div className="mt-1 rounded-md border p-3 text-sm">
                  After graduation, I aim to pursue a Master's degree in Artificial Intelligence with a focus on
                  blockchain applications. My long-term goal is to work at the intersection of AI and decentralized
                  systems, developing solutions that enhance trust and transparency in digital credentials and
                  educational achievements.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Request More Information</Button>
        <Button variant="destructive">Reject</Button>
        <Button>Approve</Button>
      </div>
    </div>
  )
}

