"use client"

import { useState } from "react"
import { Award, Calendar, Filter, GraduationCap, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { StudentDashboardHeader } from "@/components/student-dashboard-header"

// Mock data for scholarships
const allScholarships = [
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
  {
    id: 4,
    title: "Research Innovation Award",
    university: "National Science Academy",
    amount: "$4,000",
    deadline: "July 30, 2025",
    eligibility: "Students conducting original research",
    tags: ["Research", "Innovation"],
    match: "78%",
  },
  {
    id: 5,
    title: "Global Citizen Scholarship",
    university: "International University",
    amount: "$3,500",
    deadline: "August 15, 2025",
    eligibility: "Students with international experience",
    tags: ["International", "Cultural Exchange"],
    match: "75%",
  },
  {
    id: 6,
    title: "Entrepreneurship Fund",
    university: "Business School",
    amount: "$2,000",
    deadline: "September 1, 2025",
    eligibility: "Students with startup experience",
    tags: ["Business", "Entrepreneurship"],
    match: "70%",
  },
]

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [field, setField] = useState("all")
  const [minAmount, setMinAmount] = useState(0)
  const [scholarships, setScholarships] = useState(allScholarships)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    let filtered = allScholarships

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by field
    if (field !== "all") {
      filtered = filtered.filter((scholarship) =>
        scholarship.tags.some((tag) => tag.toLowerCase() === field.toLowerCase()),
      )
    }

    // Filter by minimum amount
    if (minAmount > 0) {
      filtered = filtered.filter((scholarship) => Number.parseInt(scholarship.amount.replace(/\$|,/g, "")) >= minAmount)
    }

    setScholarships(filtered)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setField("all")
    setMinAmount(0)
    setScholarships(allScholarships)
  }

  return (
    <div className="flex flex-col">
      <StudentDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Scholarships</h1>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Card className={showFilters ? "block" : "hidden"}>
          <CardHeader>
            <CardTitle>Filter Scholarships</CardTitle>
            <CardDescription>Find scholarships that match your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search scholarships..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Field of Study</label>
                <Select value={field} onValueChange={setField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="diversity">Diversity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Amount: ${minAmount}</label>
                <Slider
                  min={0}
                  max={5000}
                  step={500}
                  value={[minAmount]}
                  onValueChange={(value) => setMinAmount(value[0])}
                />
              </div>

              <div className="flex items-end space-x-2">
                <Button onClick={handleSearch} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
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

          {scholarships.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Award className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No scholarships found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

