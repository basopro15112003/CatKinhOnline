"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 flex-shrink-0" />
      case "destructive":
        return <XCircle className="h-5 w-5 flex-shrink-0" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast className="mb-2" key={id} variant={variant} {...props}>
          <div className="flex items-start gap-3 w-full">
            {getIcon(variant)}
            <div className="flex-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
