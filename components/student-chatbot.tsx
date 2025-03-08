"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
}

// Predefined responses for the chatbot
const botResponses = {
  default: "I'm here to help with any questions about scholarships or the platform. What would you like to know?",
  greeting: "Hello! How can I assist you with scholarships today?",
  scholarship:
    "We have various scholarships available based on academic merit, financial need, and specific fields of study. You can browse them in the Scholarships section.",
  application:
    "To apply for a scholarship, navigate to the scholarship details page and click the 'Apply Now' button. You'll need to have your documents verified first.",
  documents:
    "You can upload your academic transcripts, certificates, and other required documents in the Documents section. They'll be verified using our blockchain verification system.",
  deadline:
    "Each scholarship has its own deadline. You can see the deadline on the scholarship details page. Make sure to apply before the deadline!",
  payment:
    "Scholarship funds are disbursed directly to your connected wallet after approval. You'll receive a notification when the funds are transferred.",
  help: "If you need further assistance, you can contact our support team at support@scholarchain.com.",
}

export function StudentChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: botResponses.default,
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Generate bot response based on keywords
    setTimeout(() => {
      let botResponse = botResponses.default

      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
        botResponse = botResponses.greeting
      } else if (lowercaseInput.includes("scholarship")) {
        botResponse = botResponses.scholarship
      } else if (lowercaseInput.includes("apply") || lowercaseInput.includes("application")) {
        botResponse = botResponses.application
      } else if (lowercaseInput.includes("document") || lowercaseInput.includes("upload")) {
        botResponse = botResponses.documents
      } else if (lowercaseInput.includes("deadline")) {
        botResponse = botResponses.deadline
      } else if (
        lowercaseInput.includes("payment") ||
        lowercaseInput.includes("money") ||
        lowercaseInput.includes("fund")
      ) {
        botResponse = botResponses.payment
      } else if (lowercaseInput.includes("help") || lowercaseInput.includes("support")) {
        botResponse = botResponses.help
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="flex h-[500px] flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

