"use client"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ScholarshipForm() {
  const [date, setDate] = useState<Date>()
  const [criteria, setCriteria] = useState<string[]>([])
  const [newCriterion, setNewCriterion] = useState("")

  const addCriterion = () => {
    if (newCriterion.trim()) {
      setCriteria([...criteria, newCriterion.trim()])
      setNewCriterion("")
    }
  }

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index))
  }

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Scholarship Name</Label>
            <Input id="name" placeholder="e.g., Engineering Excellence Scholarship" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input id="amount" type="number" placeholder="e.g., 5000" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the scholarship, its purpose, and who should apply"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Application Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts & Humanities</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="law">Law</SelectItem>
                <SelectItem value="any">Any Field</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Eligibility Criteria</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Minimum GPA 3.5"
              value={newCriterion}
              onChange={(e) => setNewCriterion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addCriterion()
                }
              }}
            />
            <Button type="button" size="icon" onClick={addCriterion}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {criteria.length > 0 && (
            <div className="mt-2 space-y-2">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                  <span>{criterion}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeCriterion(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="required-documents">Required Documents</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select required documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transcript">Academic Transcript</SelectItem>
              <SelectItem value="recommendation">Letter of Recommendation</SelectItem>
              <SelectItem value="essay">Personal Essay</SelectItem>
              <SelectItem value="resume">Resume/CV</SelectItem>
              <SelectItem value="all">All of the above</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Create Scholarship</Button>
      </div>
    </form>
  )
}

