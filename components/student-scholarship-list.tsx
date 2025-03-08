import { Award, Calendar, GraduationCap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for scholarships
const scholarships = [
  {
    id: 1,
    title: "Engineering Excellence Scholarship",
    university: "Tech University",
    amount: "$3,000",
    deadline: "June 30, 2025",
    eligibility: "Engineering students with GPA 3.5+",
    tags: ["Engineering", "STEM"],
    match: "95%",
  },
  {
    id: 2,
    title: "Future Leaders Grant",
    university: "State University",
    amount: "$2,500",
    deadline: "July 15, 2025",
    eligibility: "Students with leadership experience",
    tags: ["Leadership", "Community Service"],
    match: "87%",
  },
  {
    id: 3,
    title: "Diversity in Tech Scholarship",
    university: "Innovation College",
    amount: "$5,000",
    deadline: "August 1, 2025",
    eligibility: "Underrepresented students in tech",
    tags: ["Technology", "Diversity"],
    match: "82%",
  },
]

export function StudentScholarshipList() {
  return (
    <div className="space-y-4">
      {scholarships.map((scholarship) => (
        <Card key={scholarship.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{scholarship.title}</CardTitle>
                  <Badge variant="outline" className="ml-2 bg-primary/10">
                    {scholarship.match} Match
                  </Badge>
                </div>
                <CardDescription>{scholarship.university}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {scholarship.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{scholarship.eligibility}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {scholarship.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Apply Now</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

